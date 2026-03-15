import { prisma } from "../config/news.prisma.instantiate.js"


class NewsRepository {
  static async getPublishedNewsRepo() {
    const publishedNews = await prisma.news.findMany({
      where : {
        published : true,
      }
    })
    if (!publishedNews || publishedNews.length === 0) {
      return null;
    }
  
    return publishedNews
  }

  static async createNewsRepo(data){
    const { judul, konten, penulis, thumbnail,published } = data; 
    const news = await prisma.news.create({
      data : {
        judul,
        konten,
        penulis,
        thumbnail,
        published
      } 
    })
    return news;
  }

  static async editNewsRepo(newsId,data) {
    const editedNews = await prisma.news.update({
      where: { id : newsId },
      data: data
    });

    return editedNews;
  }

  static async deleteNewsRepo(newsId){
    const deletedNews = await prisma.news.delete({
      where: {id : newsId},
    })

    return deletedNews;
  }

  static async publishNewsRepo(judul){
    const publishNews = await prisma.news.update({
      where: {judul},
      data : {published : true}
    })
    return publishNews;
  }

  static async searchNewsRepo(judul){
    const retrieveNews = await prisma.news.findFirst({
      where:{judul ,published : true}
    })
    return retrieveNews;
  }

}

export default NewsRepository
  