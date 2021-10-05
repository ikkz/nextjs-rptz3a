// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fetch from 'node-fetch';

export default (req, res) => {
  const { url, file } = req.query;
  return fetch(url)
    .then((response) => response.buffer())
    .then((data) => {
      res.setHeader('Content-Disposition', `attachment`);
      res.setHeader('Content-Transfer-Encoding', 'binary');
      res.status(200).send(data);
    });
};
