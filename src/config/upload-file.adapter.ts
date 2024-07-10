import multer from 'multer'

const storage = multer.memoryStorage()

const upload = multer({storage: storage})

export const uploadSingle = (filename: string ) => {
    return upload.single(filename)
}

export const uploadArr = (filename: string, maxFileNumber: number) =>{
    return upload.array(filename, maxFileNumber)
}