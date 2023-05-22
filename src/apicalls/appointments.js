import { addDoc , collection, getDocs, query, where} from "firebase/firestore"
import firestoreDatabase from "../FirebaseConfig"


export const BookBarberAppointment = async(payload)  => {
    try {
        await addDoc(collection(firestoreDatabase, "appointments"), payload);
        return { success: true, message: "Appointment booked successfully" };
    } catch (error) {
        return { success: false, message: error.message };
        
    }
}

export const GetBarberAppointmentsOnDate = async (barberId, date) => {
    try {
        const querySnapshot = await getDocs(
            query(
                collection(firestoreDatabase, "appointments"),
                where("barberId", "==", barberId),
                where("date", "==", date)
            )
        )
        const data = []
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        })
        return {
            success: true,
            data
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}   