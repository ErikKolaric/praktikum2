import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import firestoreDatabase from "../FirebaseConfig";

export const AddBarber = async (payload) => {
    try {
        await setDoc(doc(firestoreDatabase, "barbers", payload.userId), payload);

        await updateDoc(doc(firestoreDatabase, "users", payload.userId), {
            role: "barber"
        })
        return{
            success: true,
            message: "Barber added successfully, please wait for approval",
        }
    } catch (error) {
        return{
            success: false,
            message: error.message
        }
    }
}

export const CheckIfBarberAccountIsApplied = async (id) => {
    try {
        const barbers = await getDocs(
            query(collection(firestoreDatabase, "barbers"), where("userId", "==", id))
        )
        console.log(barbers.size)
        if(barbers.size > 0) {
            return {
                success: true,
                message: "Barber account already applied"
            }
        }
        return {
            success: false,
            message: "Barber account not applied"
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

export const GetAllBarbers = async () => {
    try {
        const barbers = await getDocs(collection(firestoreDatabase, "barbers"))
        return {
            success: true,
            data: barbers.docs.map((barber) => {
                return {
                    ...barber.data(),
                    id: barber.id,
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

export const UpdateBarber = async (payload) => {
    try {
        await setDoc(doc(firestoreDatabase, "barbers", payload.id), payload);
        return {
            success: true,
            message: "Barber updated successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}