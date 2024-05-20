import { Component, HostListener, inject, TemplateRef  } from '@angular/core';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'site-isa';

  days!: number;
  hours!: number;
  minutes!: number;
  seconds!: number;

  private modalService = inject(NgbModal);
	closeResult = '';

  faHouse = faHouse;
  faPhone = faPhone;
  faX = faX

  constructor() { }

  ngOnInit(): void {
    
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.timer();
  }

  timer() {
    setInterval(() => {
      const targetDate = new Date('2024-10-06');
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      const seconds = Math.ceil(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.round(seconds % 60);
      this.seconds = remainingSeconds;
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = Math.round(minutes % 60);
      this.minutes = remainingMinutes;
      const days = Math.floor(hours / 24);
      this.days = days;
      const remainingHours = Math.round(hours % 24);
      this.hours = remainingHours;
    }, 1000)
  }

  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

  goToLink(url: string){
    window.open(url, "_blank");
  }
}
