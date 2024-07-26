import { Component, HostListener, inject, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faHouse, faPhone, faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
  faX = faX;

  phoneNumber: string = '554191310319';
  message: string = 'Olá, gostaria de saber mais sobre os projetos da Isa Bandeira.';

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (window.scrollY > 50) { // Ajuste esse valor conforme necessário
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    this.timer();
  }

  timer() {
    setInterval(() => {
      const targetDate = new Date('2024-10-06T00:00:00-03:00'); // Data e hora alvo em fuso horário de Brasília
      const now = new Date();
      
      // Ajustar a hora atual para o fuso horário de Brasília
      const brTimezoneOffset = 180; // Brasília está 3 horas (180 minutos) atrás de UTC
      const localTimezoneOffset = now.getTimezoneOffset();
      const timezoneDifference = localTimezoneOffset - brTimezoneOffset;
      
      // Converter a hora atual para o fuso horário de Brasília
      const nowInBR = new Date(now.getTime() + timezoneDifference * 60000);
      
      const diff = targetDate.getTime() - nowInBR.getTime();
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
    }, 1000);
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

  goToLink(url: string) {
    window.open(url, "_blank");
  }

  getWhatsAppLink(): string {
    return `https://api.whatsapp.com/send?phone=${this.phoneNumber}&text=${encodeURIComponent(this.message)}`;
  }
}
