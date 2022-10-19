import { database, storage } from "../database/firebase";
import { doc, writeBatch } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { TasksData } from "../../pages";

export const writeSelectedData = (data: TasksData[]) => {
  const batch = writeBatch(database);

  data.forEach(async (element: any) => {
    let docRef = doc(database, "selected", `${element?.id}`);
    batch.set(docRef, element);
  });

  return batch.commit();
};

export const uploadFileToFirestore = (file: any) => {
  if (!file.name) {
    return;
  }

  const storageRef = ref(storage, `/files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      // update progress
      console.log(percent);
    },
    (err) => console.log(err),
    () => {
      // download url
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        console.log(url);
      });
    }
  );
};
