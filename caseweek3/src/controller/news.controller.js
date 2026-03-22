import NewsServices from "../services/news.services.js" 

class NewsController {
    static async listNews(req,res,next) {
        try {
            const listNewsService = await NewsServices.listNewsServices()

            return res.status(201).json(listNewsService)
        } catch (err) {
            next(err);
        }
    }

    static async addNews(req,res,next){
        try {
            const addNewsService = await NewsServices.createNewsServices(req.body,req.file);
        
            return res.status(201).json(addNewsService);
        } catch (err) {
            next(err);
        }
        
    }

    static async editNews(req,res){
        try {
            const id = req.params.id;
            const data = req.body;

            const file = req.file;

            const editNewsService = await NewsServices.editNewsServices(id,data,file);

            return res.status(201).json(editNewsService)
        }catch(err) {
            next(err);
        }
    }

    static async deleteNews(req,res){
        try{
            const id = req.params.id;
            
            const data = {id : id};
            const deleteNewsService = await NewsServices.deleteNewsServices(data);

            return res.status(201).json(deleteNewsService);

        }catch (err){
            next(err);
        }
    }
    static async publishNews(req,res){
        try{
            const judul = req.params.judul;

            const publishNewsService = await NewsServices.publishNewsServices(judul);

            return res.status(201).json(publishNewsService);
        }catch (err){
            next(err);
        }
    }

    static async searchNews(req,res){
        try {
            const  judul = req.params.judul;

            const searchNewsService = await NewsServices.searchNewsServices(judul);
            return res.status(201).json(searchNewsService);
        } catch(err){
            next(err);
        }
    }
    
}

export default NewsController



