import NewsRepository from "../repositories/news.repository.js"

class NewsServices {
    static async listNewsServices(data) {
        const newsList = await NewsRepository.getPublishedNewsRepo();
        if (!newsList) throw new Error("Failed listing data") 
        
        if (!newsList || newsList.length === 0) {
            return { message: "No news found" };
        }

        return {
            message : "Succesfully fetch news",
            data : newsList
        }
    }

    static async createNewsServices(data,file){
        const {judul,konten,penulis,published} = data;

        const thumbnailPath = file ? `/thumbnail/${file.filename}` : null;

        if (!judul || !konten || !penulis || published === undefined) {
            throw new Error("Missing essential body fields");
        }

        const publishedBool = (published === "true" || published === true);

        const addNewsRepo = await NewsRepository.createNewsRepo({
            judul,
            konten,
            penulis,
            published : publishedBool,
            thumbnail: thumbnailPath,
        });
        if (!addNewsRepo) throw new Error("Failed adding data");

        return {message : `Succesfully created data`, data : addNewsRepo}
    }

    static async editNewsServices(id,data,file){
        const newsId = parseInt(id,10);
        if (isNaN(newsId)) throw new Error("Invalid id");

        const thumbnailPath = file ? `/thumbnail/${file.filename}` : null;

        const { judul,konten,penulis,published } = data;

        if (!judul || !konten || !penulis || !published || thumbnailPath === undefined) {
            throw new Error({message : `Missing essential body`});
        }

        const publishedBool = (published === "true" || published === true)
        
        const updatedData = {
            judul,
            konten,
            penulis,
            published : publishedBool,
            thumbnail  : thumbnailPath,
        }

        const editNewsRepo = await NewsRepository.editNewsRepo(newsId,updatedData);

        if (!editNewsRepo) throw new Error("Failed editing data");


        return ({message : `Succesfully edited data`,data : editNewsRepo});
    }

    static async deleteNewsServices (data){
        const {id} = data;

        const newsId = parseInt(id,10);
        if (isNaN(newsId)) throw new Error("Invalid Id");

        const deleteNewsRepo = await NewsRepository.deleteNewsRepo(newsId);

        if (!deleteNewsRepo) throw new Error("Failed to delete news");

        return ({message :  `Succesfully deleted data`,data : deleteNewsRepo})
    }
    static async publishNewsServices(data){
        const judul = data;

          if (!judul) throw new Error("Missing judul");

        const publishNewsRepo = await NewsRepository.publishNewsRepo(judul);
        
        return ({message :  `Succesfully published news`,data : publishNewsRepo});
    }

    static async searchNewsServices(data){
        const judul = data;
        const searchNewsRepo = await NewsRepository.searchNewsRepo(judul);

        if (!judul) throw new Error("Missing judul");

        return ({message :  `Succesfully retrieved news with judul ${judul}`,data : searchNewsRepo});
    }

}



export default NewsServices