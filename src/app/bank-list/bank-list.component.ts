import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BanksService } from '../banks.service';
import { BankModel } from '../models/bankModel';
import { FilterPipe } from '../models/filter.pipe';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.sass']
})
export class BankListComponent implements OnInit {
  bankList = new Array<BankModel>()
  filterredBankList = new Array<BankModel>()
  city: string = "MUMBAI"
  options: string[] = []
  currentIndexShown: number = 0
  isDataLoaded : boolean = false
  searchText: string = ""
  constructor(private bankService: BanksService, private router: Router) { }
  pageSize: number = 5
  bankListPerPage = new Array<BankModel>()
  ngOnInit(): void {
    let favsString = localStorage.getItem("fav_banks")
    let favs: string[]
    if (favsString != null) {
      favs = JSON.parse(favsString)
    } else {
      favs = []
    }
    let temp = localStorage.getItem("bank-list")    
    if (temp != null) {
      this.bankList = JSON.parse(temp)
      this.isDataLoaded = true
    } else {
      this.bankService.getBanks(this.city).subscribe(
        (response) => {
          console.log("done")
          localStorage.setItem("bank-list", JSON.stringify(response))
          this.bankList = JSON.parse(JSON.stringify(response))
          this.isDataLoaded = true
          this.search()
        },
        (error) => {
          console.error(error);

        }
      )
    }
    for (let i of this.bankList) {
      let bankString = i.bank_id + i.bank_name + i.branch + i.city + i.district + i.ifsc + i.state + i.address
      if (favs.includes(bankString)) {
        i.isFav = true;
      }
      this.options.push(bankString)
    }
    this.search()
  }
  setBanksArray(banks: Array<BankModel>) {
    this.bankListPerPage = []
    this.bankListPerPage = banks
  }
  search() {
    let filter: FilterPipe = new FilterPipe;
    let filtered: string[] = filter.transform(this.options, this.searchText)
    this.filterredBankList = []
    for (let f of filtered) {
      let index = this.options.indexOf(f)
      this.filterredBankList.push(this.bankList[index])
    }
    this.setBanksArray(this.filterredBankList.slice(0, this.pageSize))
  }
  openCard(i: number) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "bank": JSON.stringify(this.bankList[i])
      }
    };
    this.router.navigate(['/bank/'], navigationExtras)
  }
  makeFav(index: number, flag: boolean) {
    this.bankList[index].isFav = flag
    let i: BankModel = this.bankList[index]
    let favsString = localStorage.getItem("fav_banks")
    let favs: string[]
    if (favsString != null) {
      favs = JSON.parse(favsString)
    } else {
      favs = []
    }
    if (flag) {
      favs.push(i.bank_id + i.bank_name + i.branch + i.city + i.district + i.ifsc + i.state + i.address)
      localStorage.setItem("fav_banks", JSON.stringify(favs))
    } else {
      if (favs.includes(i.bank_id + i.bank_name + i.branch + i.city + i.district + i.ifsc + i.state + i.address)) {
        console.log(favs);
        favs.splice(favs.indexOf(i.bank_id + i.bank_name + i.branch + i.city + i.district + i.ifsc + i.state + i.address), 1)
        console.log(favs);
        localStorage.setItem("fav_banks", JSON.stringify(favs))
      }
    }
  }
  left() {
    if (this.currentIndexShown == 0) {
      return
    }
    this.currentIndexShown -= this.pageSize
    this.setBanksArray(this.filterredBankList.slice(this.currentIndexShown, this.currentIndexShown + this.pageSize))
  }
  right() {
    if (this.filterredBankList.length - this.currentIndexShown < this.pageSize) {
      return
    }
    this.currentIndexShown += this.pageSize
    this.setBanksArray(this.filterredBankList.slice(this.currentIndexShown, this.currentIndexShown + this.pageSize))
  }
  changePageSize(flag: boolean) {
    if (flag) {
      this.pageSize += 1
    } else {
      if (this.pageSize != 1) {
        this.pageSize -= 1
      }
    }
    this.setBanksArray(this.filterredBankList.slice(this.currentIndexShown, this.currentIndexShown + this.pageSize))
  }
}
