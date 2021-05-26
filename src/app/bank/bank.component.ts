import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BankModel } from '../models/bankModel';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.sass']
})
export class BankComponent implements OnInit {
  bank : BankModel = new BankModel
  constructor(private route: ActivatedRoute, private router: Router) { 
    route.queryParams.subscribe(
      params=>{
        this.bank = JSON.parse(params["bank"])
      }
    )
  }

  ngOnInit(): void {
    if(this.bank == null){
      this.router.navigate(['/'])
    }
  }
  makeFav(flag: boolean){
    this.bank.isFav = flag
    let favsString = localStorage.getItem("fav_banks")
    let favs : string[]
    if(favsString != null){
      favs = JSON.parse(favsString)
    } else{
      favs = []
    }
    if(flag) {
      favs.push(this.bank.bank_id + this.bank.bank_name + this.bank.branch + this.bank.city + this.bank.district + this.bank.ifsc + this.bank.state + this.bank.address)
      localStorage.setItem("fav_banks", JSON.stringify(favs))
    } else {
      if(favs.includes(this.bank.bank_id + this.bank.bank_name + this.bank.branch + this.bank.city + this.bank.district + this.bank.ifsc + this.bank.state + this.bank.address)){
        console.log(favs);        
        favs.splice(favs.indexOf(this.bank.bank_id + this.bank.bank_name + this.bank.branch + this.bank.city + this.bank.district + this.bank.ifsc + this.bank.state + this.bank.address) , 1)
        console.log(favs);
        localStorage.setItem("fav_banks", JSON.stringify(favs))
      }
    }
  }
  backPressed(){
    this.router.navigate(['/'])
  }
}
