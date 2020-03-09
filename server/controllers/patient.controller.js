import Patient from '../models/patient.model';

/**
 * Create Patient
 * @param req
 * @param res
 * @returns record
 */
export function createPatient(req, res) {
    const { firstName, gender, lastName, email, dob, age, phone, createdBy, bloodType, height, address } = req.body;
    Patient.findOne({ 'phone': phone }, (err, userMatch) => {
        if (userMatch) {
            return res.json({
                message: `Sorry, a patient with that phone number already exists: ${phone}`,
            });
        }
        const patient = new Patient({
            firstName: firstName,
            lastName: lastName,
            email: email,
            dob: dob,
            age: age,
            phone: phone,
            createdBy: createdBy,
            bloodType: bloodType,
            height: height,
            gender: gender,
            address: address,
        });
        patient.save((error, savedPatient) => {
            if (error){
              console.log('Error creating patient',error);
                return res.status(400).json(error);
            }
            return res.json(savedPatient);
        });
    });
}

/**
 * Get Patient Record By Id
 * @param req
 * @param res
 * @returns record
 */
export function getPatientById(req, res) {
    const id = req.params.id;
    Patient.findById(id)
        .then((patient) => {
            res.status(200).json({
                success: true,
                Patient: patient,
            });
        })
        .catch((err) => {
            res.status(404).json({
                success: false,
                message: 'This patient does not exist',
                error: err.message,
            });
        });
}

/**
 * Update Patient Record By Id
 * @param req
 * @param res
 * @returns updated record
 */
export function updatePatient(req, res) {
    const id = req.params.id;
    const updateObject = req.body;
    Patient.update({ _id:id }, { $set:updateObject })
        .exec()
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'Patient is updated',
                Patient: updateObject,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.'
            });
        });
}

/**
 * Delete Patient By ID
 * @param req
 * @param res
 * @returns void
 */
export function deletePatient(req, res) {
    const id = req.params.id;
    Patient.findByIdAndRemove(id)
        .exec()
        .then(()=> res.status(204).json({
            success: true,
        }))
        .catch((err) => res.status(500).json({
            success: false,
            message: 'Unable to delete try again',
            error: err.message,
        }));
}

/**
 * find all records
 * @param req
 * @param res
 * @returns void
 */
export function getAllPatients(req, res) {
    Patient.find({}, function (err, patients) {
        if (err) return res.status(500).json({
            success: false,
            message: 'Server error try again',
            error: err.message,
        });
        res.status(200).json({
            success: true,
            patients: patients,
        });
    });
}