import { utilsFirebase } from "./firebase.adapter";

export class UploadFile{
    static async uploadToCloud(path: string, data: any){
        const imgRef = utilsFirebase.ref(
            utilsFirebase.storage,
            path
        )

        await utilsFirebase.uploadBytes(imgRef, data)
        return await utilsFirebase.getDownloadURL(imgRef)
    }
}