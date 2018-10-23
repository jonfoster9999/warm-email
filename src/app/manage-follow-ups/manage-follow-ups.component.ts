import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as constants from './../http.constants';

@Component({
  selector: 'app-manage-follow-ups',
  templateUrl: './manage-follow-ups.component.html',
  styleUrls: ['./manage-follow-ups.component.css']
})
export class ManageFollowUpsComponent implements OnInit {
  manualFollowUpEmails = []
  constructor(private http: Http, public toastr: ToastsManager) { }

  ngOnInit() {
    this.http.get(constants.API_URL + '/manual-follow-ups')
      .map(data => data.json())
      .subscribe(data => {
        this.manualFollowUpEmails = data['emails'];
      })
  }

  // onAddManualFollowUp(input) {
  //   this.http.post(constants.API_URL + '/add-manual-follow-up', {email: input.value})
  //     .map(data => data.json())
  //     .subscribe(data => {
  //       if (data['updated']) {
  //         input.value = '';
  //         this.manualFollowUpEmails = data['emails']
  //       } else {
  //         alert('Nothing was updated')
  //       }
  //     })
  // }

  onAddManualFollowUpDomain(input) {
    if (input.value.length > 2) {
      this.http.post(constants.API_URL + '/add-manual-follow-up-domain', {email: input.value.trim()})
      .map(data => data.json())
      .subscribe(data => {
        if (data['updated']) {
          input.value = '';
          this.manualFollowUpEmails = data['emails']
        } else {
          alert('Nothing was updated')
        }
      })
    } else {
      alert('Minimum length is 3 characters')
    }
  }

  removeManualFollowUp(email) {
    console.log('remove', email)
    this.http.post(constants.API_URL + "/remove-manual-follow-up", {email: email})
      .map(data => data.json())
      .subscribe(data => {
        this.manualFollowUpEmails = data['emails']
      })  
  }
}
