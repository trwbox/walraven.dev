FROM node

RUN sudo apt update

RUN sudo apt upgrade

RUN sudo apt install chromium

WORKDIR /resume

RUN npm install -g resume-cli

RUN npm install -g jsonresume-theme-elegant

CMD ["resume", "export", "--format", "pdf", "--theme", "jsonresume-theme-elegant", "/site/assests/resume/resume.pdf"]