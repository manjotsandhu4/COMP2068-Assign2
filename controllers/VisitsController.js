// INSTRUCTIONS:
/*
  Create a new resource controller that uses the
  User as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  The resource controller must contain the 7 resource actions:
  - index
  - show
  - new
  - create
  - edit
  - update
  - delete
*/ 
//Declaring constants 
const viewPath = 'visits';
const Visit = require('../models/Visit');
const User = require ('../models/User');

//Index action 
exports.index = async (req, res)=>{
  try {
    const visits = await Visit
    .find()
    .populate('user')
    .sort({updateAt: 'desc'});

    res.status(200).json(visits);
  } catch (error) {
    
    res.status(400).json({message: 'There was an error fetching visits', error});
    
  }
};

//Show action 
exports.show = async (req, res)=>{
  try {
    const visit = await Visit.findById(req.params.id)
     .populate('user');
    res.status(200).json(visit);
  } catch (error) {
    res.status(400).json({message: "Error in fetching this Visit"});
  }
};

//new action 
exports.new = (req, res)=>{
  res.render(`${viewPath}/new`, {
    pageTitle: 'New Visit'
  });
};
exports.create = async (req, res)=>{
  try {
    
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});    
    const visit = await Visit.create({user: user._id, ...req.body});

    res.status(200).json(visit);
  } catch (error) {
    res.status(400).json({message: "There was an error creating the visit post", error});
    
  }
};

//Edit action 
exports.edit = async (req, res)=>{
  try {
    const visit = await Visit.findById(req.params.id);
    res.render(`${viewPath}/edit`, {
      pageTitle: visit.visitNumber,
      formData: visit
    });
  } catch (error) {
    req.flash('danger', `Sorry we encountered an Error while rendering this Visit:${error}`);
    res.redirect('/');
  }
};

//Update action 
exports.update = async (req, res)=>{
  try {
    const { user:email} = req.session.passport;
    const user = await User.findOne({email: email});

    let visit = await Visit.findById(req.body.id);
    if(!visit) throw new Error('Visit Cannot be found');
    

    const attributes = {user:user._id, ...req.body};
    await Visit.validate(attributes);
    await Visit.findByIdAndUpdate(attributes.id, attributes);

    //flash-success
    req.flash('success', 'Visit update was successfull');
    res.redirect(`/visits/${req.body.id}`);
  } catch (error) {
    req.flash('danger', `Sorry we encountered an Error while rendering this Visit:${error}`);
    res.redirect(`/visits/${req.body.id}/edit`);
  }
};
exports.delete = async (req, res)=>{
  try {    
    await Visit.deleteOne({_id: req.body.id});
    res.status(200).json({message: "Success"});
  } catch (error) {
    res.status(400).json({message:"OOps!! there was an error."});
  }
};
