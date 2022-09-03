import jwt from "jsonwebtoken"

// want to like a post
// like button => auth middleware => like controller
// action need before some action

const auth = async(req, res, next) =>
{
  try
  {
    const token = req.headers.auth.split(" ")[1]

    const isCustomAuth = token.length < 500

    let decodedData

    if(token && isCustomAuth)
    {
      decodedData = jwt.verify(token, "test")

      req.userId = decodedData?.id
    }
    else
    {
      decodedData = jwt.decode(token)

      req.userId = decodedData?.sub
    }

    next()
  }
  catch(error)
  {
    console.log(error)
  }
}

export default auth