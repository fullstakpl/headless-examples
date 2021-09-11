// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function helloAPI(req, res) {
  console.log('body', req.body);
  res.status(200).json({ name: 'John Doe' })
}
