import firestoreDatabase from "../FirebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore"
import CryptoJS from "crypto-js";

export const CreateUser = async (payload) =>  {
    try {
        
        const qry = query(collection(firestoreDatabase, "users"), where("email", "==", payload.email));
        const querySnapshot = await getDocs(qry);
        if(querySnapshot.size > 0) {
            console.log(querySnapshot.size)
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
        const userSnapshoot = await getDocs(qry);
        if(userSnapshoot.size === 0) {
            throw new Error("User does not exist");
        }
        const user = userSnapshoot.docs[0].data();
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