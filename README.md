# Ana & André — Wedding Website

Projeto Next.js para o casamento de Ana & André, inspirado apenas na paleta do Save the Date: verde-oliva, azul aguarela, creme e dourado suave.

## Incluído

- Landing page responsiva/mobile-first
- Introdução interativa com envelope/carta a abrir, inspirada no vídeo de referência
- A introdução aparece sempre que a página inicial é carregada, para garantir o efeito visual de entrada
- Hero desenhado em CSS, sem utilizar a imagem original do Save the Date
- Contagem decrescente para 14/05/2027 às 11h
- Secções de cerimónia, programa, Castro Verde, alojamento e RSVP
- Formulário de RSVP único (sem códigos de convite): os convidados preenchem o formulário e os organizadores recebem um email com a resposta, via Gmail SMTP (Nodemailer)
- Ficheiro `.ics` para adicionar o casamento ao calendário

## 1. Instalar

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre `http://localhost:3000`.

Sem as variáveis do Gmail configuradas, o formulário aceita a submissão mas o envio do email falha — configura o Gmail (passo 2) antes de testar de ponta a ponta.

## 2. Introdução com carta

Ao carregar a página inicial, o site apresenta imediatamente um envelope fechado com selo. A animação é feita diretamente em HTML/CSS, inspirada no vídeo de referência, por isso fica nítida em qualquer resolução e não depende de um MP4.

Ao tocar no envelope/selo:

1. o selo desaparece;
2. a aba do envelope abre;
3. a carta sobe e mostra Ana & André, a data e Castro Verde;
4. a introdução dissolve-se e revela o site.

A identidade usa apenas a paleta do Save the Date — não utiliza a imagem original.

Para testar novamente sem fechar o browser, abre a consola e executa:

```js
sessionStorage.removeItem("ana-andre-invitation-opened")
```

Depois faz refresh.

## 3. Configurar Gmail SMTP

1. Ativa a verificação em dois passos na tua conta Gmail (obrigatório para app passwords).
2. Vai a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) e cria uma app password (ex.: "Ana André Wedding").
3. Adiciona ao `.env.local`:

```env
GMAIL_USER=vossoemail@gmail.com
GMAIL_APP_PASSWORD=xxxxxxxxxxxxxxxx
NOTIFY_EMAIL=vosso-email@example.com
```

Quando um convidado submete o formulário, o endpoint `/api/rsvp` envia, via `GMAIL_USER`, um email para `NOTIFY_EMAIL` com nome, presença, número de pessoas, necessidade de alojamento, restrições alimentares e mensagem.

> O Gmail limita o envio a cerca de 500 emails/dia, mais do que suficiente para notificações de RSVP de um casamento.

## 4. Vercel

1. Faz push deste projeto para GitHub.
2. Importa o repositório no Vercel.
3. Adiciona as mesmas variáveis de ambiente (`GMAIL_USER`, `GMAIL_APP_PASSWORD`, `NOTIFY_EMAIL`).
4. Faz deploy.
5. Liga o domínio personalizado.

## Personalização recomendada

- substituir textos temporários de cerimónia/local;
- adicionar endereço exato e links de mapa;
- adicionar fotos do casal se quiserem;
- rever programa/horários;
- adicionar favicon e domínio final.

## Estrutura

```text
app/
  api/rsvp/
  page.tsx
components/
  Countdown.tsx
  InvitationIntro.tsx
  RsvpForm.tsx
public/
  ana-andre-2027.ics
```
