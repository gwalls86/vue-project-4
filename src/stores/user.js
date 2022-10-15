import {defineStore} from 'pinia';
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {ref,computed} from 'vue';
import { auth } from '../firebaseConfig';
//import {useRouter} from 'vue-router';
import router from '../router';
import { useDatabaseStore } from './database';

//const useRouter = useRouter();

export const useUserStore = defineStore('userStore', () => {

    //state
    // const userData = ref();

    // //getters -> Captadores
    // const minuscula = computed (( ) => userData.value.toLowerCase());

    // const registerUser = ( (name) => {
    //     userData.value = name;
    // });

    const userData = ref(null);
    const loadingUser = ref(false);
    const loadingSession = ref(false);
    

    const registerUser = ( async (email, password) => {
       loadingUser.value = true;
        try{
            const {user} = await createUserWithEmailAndPassword(auth, email, password);
            
            userData.value = {email: user.email, uid: user.uid};
            console.log(userData.value);
            router.push('/');
        }catch (error){
            console.log(error);
        } finally {
           loadingUser.value =false;
        }

    });

    const loginUser = ( async(email,password) => {
       loadingUser.value = true;
        try {
            const {user} = await signInWithEmailAndPassword(auth,email,password);
            userData.value = {email: user.email, uid: user.uid};
            router.push('/');
        } catch (error) {
            console.log(error);
        }finally{
            loadingUser.value =false;
        }

    });

    const logoutUser = (async () => {
       // loadingUser.value = true;
        
        try {            
            await signOut(auth);
            userData.value = null;
            router.push('/login');       
            const databaseStore = useDatabaseStore();
            databaseStore.$reset();      
            
        } catch (error) {
            console.log(error);
        }finally{
           
        }
    }
    );

    const currentUser = ( () => {
        //Crear una promesa para manejar el usuario conectado
        //Se recomienda utilizar unsuscribe para cancelar la suscripción del observador
        return new Promise ( ( resolve , reject ) => {
            const unsuscribe = onAuthStateChanged(auth, user => {
                if(user){
                    //Si existe el usuario
                    userData.value = {email: user.email, uid: user.uid};
                }else{
                    userData.value = null;
                }
                resolve(user);
            //Gestiona el error
            }, e => reject(e));
            unsuscribe();
        });
    });

    return{
        // userData,
        // minuscula,
        // registerUser,
        loadingUser,
        registerUser,        
        loginUser,
        logoutUser,
        currentUser,
        userData,
        loadingSession,
    }
});
