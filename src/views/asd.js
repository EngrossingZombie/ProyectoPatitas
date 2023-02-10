const updateCustomer = async(req, res, next) => {
    const {error} = validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);
    const id = req.params.id;
    const data = req.body;
    let customer = await Customer.findByIdAndUpdate(id, {
        firstname: data.firstname,
        lastname: data.lastname,
        phonenumber: data.phonenumber,
        cnic: data.cnic,
        address: data.address
    }, {new: true});
    if(!customer) return res.status(404).send('Customer with the given id not found');

    res.redirect('/');
}




<div class="card">
    <div class="card-header">
        <h4 class="font-weight-bold">Update Customer</h4>
    </div>
    <div class="card-body">
        <form action="/updateCustomer/<%= oneUser._id %>" method="post">
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label class="col-form-label" for="firstname">First Name</label>
                        <input type="text" class="form-control" value="<%= oneUser.firstname %>" name="firstname" placeholder="enter first name" id="firstname">
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label class="col-form-label" for="lastname">Last Name</label>
                        <input type="text" class="form-control" value="<%= oneUser.lastname %>" name="lastname" placeholder="enter last name" id="lastname">
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label class="col-form-label" for="phonenumber">Phone Number</label>
                        <input type="number" class="form-control" value="<%= oneUser.phonenumber %>" name="phonenumber" placeholder="enter your phone number" id="phonenumber">
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label class="col-form-label" for="cnic">CNIC</label>
                        <input type="text" class="form-control" value="<%= oneUser.cnic %>" name="cnic" placeholder="22222-2222222-2" id="cnic">
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label for="addres">Address</label>
                        <textarea class="form-control" name="address" id="address" rows="3">
                        <%= oneUser.address %>
                        </textarea>
                    </div>
                </div>
            </div>
            <div class="">
                <button type="submit" class="btn btn-success">Actualizar</button>
                <a href="/" class="btn btn-light">Cancelar</a>
            </div>
        </form>
    </div>
</div>