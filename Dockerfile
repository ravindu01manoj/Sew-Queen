FROM ravindu01manoj/sewqueen:fullcontrol

RUN git clone https://github.com/ravindu01manoj/Sew-Queen /root/QueenSewWhatsappBot
WORKDIR /root/QueenSewWhatsappBot/
ENV TZ=Asia/Colombo
RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "sew.js"]
