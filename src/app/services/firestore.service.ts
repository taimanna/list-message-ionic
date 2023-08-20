import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

export class MessageItem {
  message?: string;
  author?: string;
  createdTime?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  tutorialsRef!: AngularFirestoreCollection<MessageItem>;

  constructor(db: AngularFirestore) {
    this.tutorialsRef = db.collection('/messages', (ref) =>
      ref.orderBy('createdTime', 'asc')
    );
  }

  getAllMessages() {
    return this.tutorialsRef.snapshotChanges();
  }

  addNewMessage(message: MessageItem) {
    message.createdTime = new Date();
    return this.tutorialsRef.add({ ...message });
  }

  deleteMessage(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }

  updateMessage(id: string, message: MessageItem) {
    // message.createdTime = new Date();
    return this.tutorialsRef.doc(id).update({ ...message });
  }
}
