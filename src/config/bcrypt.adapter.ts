import { genSaltSync, hashSync } from "bcrypt"


export const bcryptAdapter = {

    hash: (password: string) => {
        const jump = genSaltSync(12)
        return hashSync(password, jump)

    }
}