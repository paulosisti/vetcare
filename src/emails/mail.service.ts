import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(email: string, nomeUsuario: string) {
    await this.mailerService.sendMail({
      to: email,
      from: 'petcaresenac@gmail.com',
      subject: 'Seja Bem-vindo(a) à PetCare! 🐾',
      html: `<div style="background-color: #2adc9e; height: auto; padding: 3px">
        <h2 style="font-family: Arial; color: #40414c; font-size: 24px; font-weight: bold; text-align: center;">
          Bem-vindo(a) ao PetCare, o melhor lugar para registrar as informações do seu pet ✍🏻
        </h2>
      </div>
      <p style="font-family: Arial; font-size: 16px; color: #40414c; text-align: justify;">
        Olá ${nomeUsuario}, estamos muito animados em tê-lo(a) conosco!<br><br>
        Com nosso aplicativo web, você pode organizar facilmente informações importantes sobre o seu animal de estimação.
        Desde detalhes médicos e vacinações até lembretes de cuidados, somos seu aliado para manter tudo em dia.
        <br>
        <br>
        Para acessar o sistema basta acessar este link: <a href="https://petcare-online.web.app/login">https://petcare-online.web.app/login</a>
        <br>
        <br>
        Dados de acesso:
        <br>
        email: ${email}
        <br>
        Senha inicial: <strong>senha123</strong>
        <br>
      </p>
      <p style="font-family: Arial;font-size: 16px; color: #40414c; text-align: justify;">
        Acompanhe o bem-estar e desenvolvimento do seu pet de forma conveniente.
        Compartilhe essas informações com qualquer pessoa para mantê-los atualizados sobre as informações do seu companheiro.
      </p>
      <p style="font-family: Arial;font-size: 16px; color: #40414c; text-align: justify;">
        Sinta-se à vontade para explorar todas as funcionalidades do nosso aplicativo, tornando a experiência com seu pet mais fácil e proporcionando mais comodidade para você.
      </p>
      <p style="font-family: Arial;font-size: 16px; color: #40414c; text-align: justify;">
        Agradecemos por fazer parte da nossa comunidade de amantes de animais.
        Esperamos que nosso trabalho torne a jornada com o seu pacientes ainda mais especial!
      </p>
      <div style="font-family: Arial ;font-size: 16px; color: #40414c; text-align: center; background-color: #2adc9e; height: auto;">
        <p style="text-align: center; padding: 5px">
          <b>Equipe PetCare 🐶🐱</b>
        </p>
      </div>`,
    });
  }

  async sendMailVaccine(
    email: string,
    name: string,
    vaccines: string,
    date: string,
    petName: string,
  ) {
    await this.mailerService.sendMail({
      to: email,
      from: 'petcaresenac@gmail.com',
      subject: `PetCare Informa! 🐾`,
      html: `<div style="background-color: pink; height: auto; padding: 3px"><h2 style="font-family: Arial; color: #0e1a75; font-size: 24px; font-weight: bold; text-align: center;">Importante: Atualização de Cadastro 🔔</h2></div><p style="font-family: Arial; color: #0e1a75; font-size: 16px;">Olá, ${name} uma nova vacina foi criada para o seu pet na plataforma.</p><p style="font-family: Arial; color: #0e1a75; font-size: 16px;">Vacina: ${vaccines}</p><p style="font-family: Arial; color: #0e1a75; font-size: 16px;">Data: ${date}</p><p style="font-family: Arial; color: #0e1a75; font-size: 16px;">Nome do Pet: ${petName}</p><div style="font-family: Arial ;font-size: 16px; color: #0e1a75; text-align: center; background-color: #ffe3d1; height: auto;"><p style="text-align: center; padding: 5px"><b>Equipe PetCare 🐶🐱</b><p></div>`,
    });
  }

  async sendMailVaccineUpdate(
    email: string,
    name: string,
    vaccines: string,
    date: string,
    petName: string,
  ) {
    await this.mailerService.sendMail({
      to: email,
      from: 'petcaresenac@gmail.com',
      subject: `PetCare Informa! 🐾`,
      html: `<div style="background-color: pink; height: auto; padding: 3px"><h2 style="font-family: Arial; color: #0e1a75; font-size: 24px; font-weight: bold; text-align: center;">Importante: Atualização de Cadastro 🔔</h2></div><p style="font-family: Arial; color: #0e1a75; font-size: 16px;">Olá, ${name} um registro de vacina foi atualizado.</p><p style="font-family: Arial; color: #0e1a75; font-size: 16px;">Vacina: ${vaccines}</p><p style="font-family: Arial; color: #0e1a75; font-size: 16px;">Data: ${date}</p><p style="font-family: Arial; color: #0e1a75; font-size: 16px;">Nome do Pet: ${petName}</p><div style="font-family: Arial ;font-size: 16px; color: #0e1a75; text-align: center; background-color: #ffe3d1; height: auto;"><p style="text-align: center; padding: 5px"><b>Equipe PetCare 🐶🐱</b><p></div>`,
    });
  }
}
