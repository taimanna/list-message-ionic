import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { Router } from '@angular/router';
import {
  FirestoreService,
  MessageItem,
} from 'src/app/services/firestore.service';
import { IonModal } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { formatDistance } from 'date-fns';
import { ja } from 'date-fns/locale';

const NUMBER_OF_ITEMS = 3;

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.page.html',
  styleUrls: ['./list-message.page.scss'],
})
export class ListMessagePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  isToastOpen: boolean = false;
  userEmail: string = '';
  threeMessages: any[] = [];
  newMessage = new MessageItem();
  page: number = 0;
  pageLength: number = NaN;
  backButtonDisable: boolean = true;
  nextButtonDisable: boolean = false;
  userUid: string = '';

  constructor(
    private fireAuthService: FirebaseAuthService,
    private firestoreService: FirestoreService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.getThreeMessages(
      this.page * NUMBER_OF_ITEMS,
      this.page * NUMBER_OF_ITEMS + NUMBER_OF_ITEMS
    );
  }

  ngOnInit() {
    this.fireAuthService.getCurrentUser().then((user: any) => {
      this.userUid = user.uid;
      this.userEmail = this.changeToDot(user.email.split('@')[0]);
    });
  }

  changeToDot(userEmail: string) {
    if (userEmail.length > 9) {
      userEmail = userEmail.slice(0, 9).trim() + '...';
    }

    return userEmail;
  }

  setToastOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  formatDate(timestamp: any) {
    let formattedDate = '';

    if (timestamp) {
      formattedDate = formatDistance(new Date(timestamp * 1000), new Date(), {
        addSuffix: true,
        locale: ja,
      });

      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    return formattedDate;
  }

  getThreeMessages(start: number, end: number) {
    this.firestoreService.getAllMessages().subscribe((documents) => {
      this.threeMessages = documents.slice(start, end);
      this.pageLength = Math.floor(documents.length / NUMBER_OF_ITEMS);

      this.threeMessages.forEach((message) => {
        message.postingDay = this.formatDate(
          message.payload.doc.data().createdTime.seconds
        );
      });

      if (this.page * NUMBER_OF_ITEMS + NUMBER_OF_ITEMS >= documents.length) {
        this.nextButtonDisable = true;
      } else {
        this.nextButtonDisable = false;
      }

      if (this.page * NUMBER_OF_ITEMS >= documents.length && this.page !== 0) {
        this.handleBack();
      }
    });
  }

  handleAddNewMessage() {
    this.newMessage.author = this.userEmail;
    this.firestoreService.addNewMessage(this.newMessage, this.userUid);
    this.newMessage.message = '';
  }

  async handleEdit(id: string, authorUid: string) {
    if (this.userUid === authorUid) {
      const alert = await this.alertController.create({
        header: 'メッセージを編集',
        inputs: [
          {
            placeholder: 'New message',
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {},
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: (mes) => {
              this.newMessage.author = this.userEmail;
              this.newMessage.message = mes[0];
              this.firestoreService.updateMessage(id, this.newMessage);
              this.newMessage.message = '';
            },
          },
        ],
      });

      await alert.present();
    } else {
      this.setToastOpen(true);
    }
  }

  async handleDelete(id: string) {
    const alert = await this.alertController.create({
      header: '確認',
      subHeader: '削除しても良いですか？',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.firestoreService.deleteMessage(id);
          },
        },
      ],
    });

    await alert.present();
  }

  handleBack() {
    if (this.page > 0) {
      this.page -= 1;
      this.getThreeMessages(
        this.page * NUMBER_OF_ITEMS,
        this.page * NUMBER_OF_ITEMS + NUMBER_OF_ITEMS
      );
      this.nextButtonDisable = false;
    }

    if (this.page === 0) {
      this.backButtonDisable = true;
    }
  }

  handleNext() {
    if (this.page < this.pageLength) {
      this.page += 1;
      this.getThreeMessages(
        this.page * NUMBER_OF_ITEMS,
        this.page * NUMBER_OF_ITEMS + NUMBER_OF_ITEMS
      );
      this.backButtonDisable = false;
    }

    if (this.page === this.pageLength) {
      this.nextButtonDisable = true;
    }
  }

  handleSignOut() {
    this.fireAuthService.signOut();
    this.router.navigate(['/home']);
  }
}
