import { addDoc,collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore/lite';
import {defineStore} from 'pinia';
import {ref} from 'vue';
import {db,auth} from '../firebaseConfig'
import {nanoid} from 'nanoid'
import router from '../router';

export const useDatabaseStore = defineStore ('database', () => {
   
    const documents = ref([]);  
    const loadingDoc = ref(false);  
    
    const updateUrl = (async (id,name) => { 
        try {
            const docRef = doc (db,"urls",id);
            const docSnap = await getDoc(docRef);

            if(!docSnap.exists()){
                throw new Error("No existe el doc");
            }
            if(docSnap.data().user !== auth.currentUser.uid){
                throw new Error("No le pertenece ese documento"); 
            }

            await updateDoc(docRef,{
                name: name,
            });

            //Actualizar la url en documents -> Variable reactiva
            documents.value = documents.value.map(item => item.id === id ? ({...item, name: name}) : item);
            router.push('/');
        } catch (error) {
            console.log(error.message);
        }
     });

    const leerUrl = (async (id) => {
        try {
            const docRef = doc (db,"urls",id);
            const docSnap = await getDoc(docRef);

            if(!docSnap.exists()){
                throw new Error("No existe el doc");
            }
            if(docSnap.data().user !== auth.currentUser.uid){
                throw new Error("No le pertenece ese documento"); 
            }

            return docSnap.data().name;
        } catch (error) {
            console.log(error.message);
        }
    
    });

    const deleteUrl = (async (id) => { 
        try {
            const docRef = doc(db,'urls', id); //Referencia al documento
            //Opcional seguridad fronted
            const docSnap = await getDoc(docRef);
            if(!docSnap.exists()){
                throw new Error();
            }
            if(docSnap.data().user !== auth.currentUser.uid){
                throw new Error("No le pertenece ese documento"); 
            }

            await deleteDoc(docRef); //Método propio de firebase para eliminar
            documents.value = documents.value.filter(item => item.id != id);
        } catch (error) {
            console.log(error.message);
        } finally {

        }
    });

    const addUrl = (async (name) => {
        try {
            const objetoDoc = {
                name: name,
                short: nanoid(6),
                user: auth.currentUser.uid,
            };
            const docRef = await addDoc(collection(db,"urls"), objetoDoc);
            documents.value.push({
                id: docRef.id,
                ...objetoDoc, //Destructuración para guardar el resto
            })
        } catch (error) {
            console.log(error);
        } finally {

        }
    });

    const getUrls = (async() => {
        try {
            //Definir un query. Urls se hac creado previamente en firestore
            //const q = query(collection(db, "urls"))
            if (documents.value.length !== 0){
                return;
            }
            
            loadingDoc.value = true;
            const q = query(collection(db, "urls"), where("user","==",auth.currentUser.uid));
            const querySnapshot = await getDocs(q); //Llamado a base de datos. await porque tiene un tiempo de respuesta
            querySnapshot.forEach(doc => {
                //console.log(doc.id,doc.data());
                documents.value.push({
                    id: doc.id,
                    ...doc.data(), //Destructuración para guardar el resto
                })
            });
        } catch (error) {
            console.log(error);
        } finally {
            loadingDoc.value = false;
        }

    });

    return{
        documents,
        getUrls,
        loadingDoc,
        addUrl,
        deleteUrl,
        leerUrl,
        updateUrl,
    }   

});