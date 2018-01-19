import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { StateService } from '../../../service/state.service'
import { ApiService } from '../../../service/api.service'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public searchForm: FormGroup
  public model: any = {
    name: ''
  }

  constructor(private formBuilder: FormBuilder, private router: Router, public state: StateService, private api: ApiService) {
    this.state.heading = ''
  }

  ngOnInit() {
    this.state.is_load = false
    this.searchForm = this.formBuilder.group({name: [this.model.name, [Validators.required]]})
  }

  search() {
    this.api.postClanSearch(this.model.name).subscribe(content => content['Response']['results'].length ? this.router.navigate(['/', 'clan', content['Response']['results'][0]['groupId']]) : console.log('failed'))
  }

}