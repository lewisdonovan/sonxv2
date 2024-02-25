import { initializeApp, getApps } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  CollectionReference, 
  DocumentData 
} from "firebase/firestore";
import { firebaseConfig } from "@/config/firebase.config";

const apps = getApps();

export const db = apps.length
  ? getFirestore(apps[0]) 
  : getFirestore(initializeApp(firebaseConfig));

/* ========================
  ===  === DB TYPES === ===
=========================== */

export const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>
}

import type {
  Account, 
  Session, 
  User, 
  Token, 
  Post
} from "@/types";
export const accountsCol = createCollection<Account>('accounts');
export const sessionsCol = createCollection<Session>('sessions');
export const usersCol = createCollection<User>('users');
export const tokensCol = createCollection<Token>('tokens');
export const postsCol = createCollection<Post>('posts');