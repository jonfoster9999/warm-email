import * as constants from './../http.constants';
import { UsersService } from './../services/users.service';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';


@Component({
  selector: 'app-email-count',
  templateUrl: './email-count.component.html',
  styleUrls: ['./email-count.component.css']
})
export class EmailCountComponent implements OnInit {
  emailArr = [];
  selectedEmails = [];
  constructor(private http: Http, private usersService: UsersService) { }

  ngOnInit() {
    const bigObj = {};


    const userObj = {};
    const userArr = []
    const user = this.usersService.currentUser();
    this.http.get(constants.API_URL + '/users/' + user.id + '/sent_emails')
      .map(data => data.json())
      .subscribe(data => {
        function findType(arg) {
          var results = null;
          for(let i = 0, n = data.length; i < n; i++) {
            if (data[i]['email'] == arg && (data[i]['email_type'] != null)) {
              results = data[i]['email_type'];
              break;
            }
          }
          return results;
        }

        function findManualFollowUp(arg) {
          var results = null;
          for(let i = 0, n = data.length; i < n; i++) {
            if (data[i]['email'] == arg) {
              results = data[i]['manual_follow_up'];
              break;
            }
          }
          return results;
        }

        function findLastEmail(user) {
          var objs = data.filter((email) => {
            return email.email == user;
          })
          var dates = objs.map(email => new Date(email.created_at));
          var latestDate = new Date(0);
          dates.forEach(date => {
            if (date > latestDate) {
              latestDate = date;
            }
          })
          return (latestDate.getMonth() + 1) + "-" + latestDate.getDate() + "-" + latestDate.getFullYear();
        }

        data.forEach(function(email) {
          userObj[email.email] = userObj[email.email] || 0;
          userObj[email.email]++; 
        })

        for (let user in userObj) {
          userArr.push({email: user, count: userObj[user], last_email: findLastEmail(user), email_type: findType(user), manual_follow_up: findManualFollowUp(user), checked: false})
        }
        userArr.forEach(obj => {
          bigObj[obj.email_type] = bigObj[obj.email_type] || [];
          bigObj[obj.email_type].push(obj);
        })

        for (let arr in bigObj) {
          bigObj[arr] = bigObj[arr].sort(this.sortFunction);
          this.emailArr.push({title: arr, collection: bigObj[arr]})
        }
      })
  }

  sortFunction(a, b) {
    var keyA1 = a.count;
    var keyB1 = b.count;
    var keyA2 = new Date(a.last_email);
    var keyB2 = new Date(b.last_email);

    if (keyA1 < keyB1) return -1;
    if (keyA1 > keyB1) return 1;
    if (keyA2 < keyB2) return -1;
    if (keyA2 > keyB2) return 1;
    return 0;
  }

  markRow(topIndex, i) {
    this.emailArr[topIndex].collection[i].checked = !this.emailArr[topIndex].collection[i].checked;
    const emailObj = { email: this.emailArr[topIndex].collection[i].email }
    if (this.emailArr[topIndex].collection[i].checked) {
      this.selectedEmails.push(emailObj);
    } else {
      const i = this.selectedEmails.indexOf(emailObj);
      this.selectedEmails.splice(i, 1);
    }
    console.log(this.selectedEmails);
  }

  // markAdRow(i) {
  //   this.sortedAdArr[i].checked = !this.sortedAdArr[i].checked;
  // }

  clearChecks(index) {
    this.emailArr[index].collection.forEach(count => {
      count.checked = false;
    })
  }

  exportCSV() {
    var fileName = window.prompt('Please enter file name...');
    var options = { 
      headers: ["Email"]
    };
    new Angular5Csv(this.selectedEmails, fileName, options);
    this.emailArr.forEach((el, i) => {
      this.clearChecks(i);
    })
  }
}
