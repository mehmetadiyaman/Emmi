const { MongoClient, ObjectId } = require("mongodb");
const { GridFSBucket } = require("mongodb");
const getPagination = require("../utils/get_pagination_util");

const getNewsByCategory = async (req, res) => {
  try {
    const client = await MongoClient.connect(process.env.MONGO_CONNECTION_URI);
    const db = client.db("Emmi");
    const collection = db.collection("news");

    // URL'den kategori parametresini al
    const category = req.params.category;

    // Pagination için değişkenler
    const limit = 10;
    const totalBlogs = await collection.countDocuments({ category: category });

    // getPagination util'ini kullan
    const paginationObj = getPagination(
      `/${category}/`,
      { pageNumber: req.params.pageNumber || req.query.page || 1 },
      limit,
      totalBlogs
    );

    // Kategoriye göre haberleri getir
    const news = await collection
      .find({ category: category })
      .sort({ _id: -1 })
      .skip(paginationObj.skip)
      .limit(paginationObj.limit)
      .toArray();

    // Her haber için gerekli formatta veri hazırla
    const formattedBlogs = news.map((article) => ({
      _id: article._id,
      title: article.title,
      description: article.description,
      banner: {
        url: `/news/image/${article.image_id}`,
      },
      link: article.link,
      createdAt: article._id.getTimestamp(),
    }));

    // Kategori adını düzgün formatta göster
    const categoryTitle = category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    res.render("pages/news_category", {
      latestBlogs: formattedBlogs,
      title: categoryTitle,
      route: `/${category}`,
      sessionUser: req.session.user,
      pagination: paginationObj,
    });

    await client.close();
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).send("Bir hata oluştu");
  }
};

// Görselleri getir
const getImage = async (req, res) => {
  try {
    const client = await MongoClient.connect(process.env.MONGO_CONNECTION_URI);
    const db = client.db("Emmi");
    const bucket = new GridFSBucket(db);

    const imageId = new ObjectId(req.params.id);
    const downloadStream = bucket.openDownloadStream(imageId);

    res.set("Content-Type", "image/jpeg");
    downloadStream.pipe(res);

    downloadStream.on("end", () => {
      client.close();
    });

    downloadStream.on("error", (error) => {
      console.error("Görsel stream hatası:", error);
      res.status(404).send("Görsel bulunamadı");
      client.close();
    });
  } catch (error) {
    console.error("Görsel yükleme hatası:", error);
    res.status(404).send("Görsel bulunamadı");
  }
};

module.exports = {
  getNewsByCategory,
  getImage,
};
