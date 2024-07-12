import { utilsFirebase } from "./firebase.adapter";
import { generateUUID } from "./generate-uuid.adapter";

export class UploadFile{
    static async uploadToCloud(path: string, data: Buffer){
        const imgRef = utilsFirebase.ref(
            utilsFirebase.storage,
            path
        )

        await utilsFirebase.uploadBytes(imgRef, data)
        return await utilsFirebase.getDownloadURL(imgRef)
    }


    static async uploadMultipleFilesFirebase(
        path:string, 
        filesData:  Express.Multer.File[]){
        const uploadPromise = filesData.map(async ({originalname, buffer}) =>{
            const filePath = `${path}/${generateUUID()}-${originalname}`
            const imgRef = utilsFirebase.ref(utilsFirebase.storage, filePath)

            await utilsFirebase.uploadBytes(imgRef, buffer)
            return await utilsFirebase.getDownloadURL(imgRef)
        })

        return await Promise.all(uploadPromise)
    }
}