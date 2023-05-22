import { addDoc , collection} from "firebase/firestore"
import firestoreDatabase from "../FirebaseConfig"


export const BookBarberAppointment = async(payload)  => {
    try {
        await addDoc(collection(firestoreDatabase, "appointments"), payload);
        return { success: true, message: "Appointment booked successfully" };
    } catch (error) {
        return { success: false, message: error.message };
        
    }
}