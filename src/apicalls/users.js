import firestoreDatabase from "../FirebaseConfig";
import { collection, addDoc, getDocs, query, where, getDoc, doc } from "firebase/firestore"
import CryptoJS from "crypto-js";

export const CreateUser = async (payload) =>  {
    try {
        const qry = query(collection(firestoreDatabase, "users"), where("email", "==", payload.email));
        const querySnapshot = await getDocs(qry);
        if(querySnapshot.size > 0) {
            throw new Error("User already exists") 
        }
        
        const hashedPassword = CryptoJS.AES.encrypt(
            payload.password,
            "barber-shop"
            ).toString();
            payload.password = hashedPassword;
            
            const docRef = collection(firestoreDatabase, "users");
            await addDoc(docRef, payload);
            return {
                success: true,
                message: "User created successfully",
            }
    } catch (error) {
        return error
    }
}

export const LoginUser = async (payload) => {
    try {
        const qry = query(
            collection(firestoreDatabase, "users"),
            where("email", "==", payload.email)
        );
        const userSnapshoots = await getDocs(qry);
        if(userSnapshoots.size === 0) {
            throw new Error("User does not exist");
        }

        const user = userSnapshoots.docs[0].data();
        user.id = userSnapshoots.docs[0].id
        const bytes = CryptoJS.AES.decrypt(user.password, "barber-shop")
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8)

        if(originalPassword !== payload.password) {
            throw new Error("Incorrect password")
        }
        return{
            success: true,
            message: "User logged in successfully",
            data: user
        }

    } catch (error) {
        return error
    }
}

export const GetAllUsers = async () => {
    try {
        const users = await getDocs(collection(firestoreDatabase, "users"))
        return {
            success: true,
            data: users.docs.map((user) => {
                return {
                    ...user.data(),
                    id: user.id,
                }
            })
        }
        
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

export const GetUserById = async (id) => {
    try {
        const user = await getDoc(doc(firestoreDatabase, "users", id))
        return {
            success: true,
            data: {
                ...user.data(),
                id: user.id
            }
        }
    } catch (error) {
        return error
    }
}