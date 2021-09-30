import { getFirestore } from "firebase/firestore";
import app from "./app";

const database = getFirestore(app);

export default database;
