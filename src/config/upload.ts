import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'), //pasta que vai ficar as imagens,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX'); //criando um hash aleatório para o nome da imagem
      const fileName = `${fileHash}-${file.originalname}`; //criando o nome da imagem com o nome original mais o hash

      return callback(null, fileName);
    },
  }),
};
