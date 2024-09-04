import bcrypt from "bcryptjs";


const Bcrypt = {
        hash: (password: string): Promise<string> =>{
            return bcrypt.hash(password, 11)
        },
        compare: (hashedPassword: string, password: string): Promise<boolean> => {
            return bcrypt.compare(password, hashedPassword)
        },
}
export default Bcrypt