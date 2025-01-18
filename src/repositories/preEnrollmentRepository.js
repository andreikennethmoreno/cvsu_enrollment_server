// src/repositories/preEnrollmentRepository.js
import { BaseRepository } from './baseRepository.js';
import PreEnrollment from '../models/preEnrollmentModel.js';

export class PreEnrollmentRepository extends BaseRepository {
  constructor() {
    super('pre_enrollments', PreEnrollment);
  }

  // Create a new pre-enrollment record
  async create(preEnrollmentData) {
    const {
      last_name,
      first_name,
      middle_name,
      suffix,
      date_of_birth,
      place_of_birth,
      age,
      status,
      mobile_number,
      email_address,
      religion,
      citizenship,
      home_address,
      region,
      province,
      municipality,
      zip_code,
      guardian_name,
      guardian_family_name,
      guardian_first_name,
      guardian_middle_name,
      guardian_relation,
    } = preEnrollmentData;

    return super.create({
      last_name,
      first_name,
      middle_name,
      suffix,
      date_of_birth,
      place_of_birth,
      age,
      status,
      mobile_number,
      email_address,
      religion,
      citizenship,
      home_address,
      region,
      province,
      municipality,
      zip_code,
      guardian_name,
      guardian_family_name,
      guardian_first_name,
      guardian_middle_name,
      guardian_relation,
    });
  }

  // Update an existing pre-enrollment record by ID
  async update(id, preEnrollmentData) {
    const {
      last_name,
      first_name,
      middle_name,
      suffix,
      date_of_birth,
      place_of_birth,
      age,
      status,
      mobile_number,
      email_address,
      religion,
      citizenship,
      home_address,
      region,
      province,
      municipality,
      zip_code,
      guardian_name,
      guardian_family_name,
      guardian_first_name,
      guardian_middle_name,
      guardian_relation,
    } = preEnrollmentData;

    const dataToUpdate = {
      ...(last_name && { last_name }),
      ...(first_name && { first_name }),
      ...(middle_name && { middle_name }),
      ...(suffix && { suffix }),
      ...(date_of_birth && { date_of_birth }),
      ...(place_of_birth && { place_of_birth }),
      ...(age && { age }),
      ...(status && { status }),
      ...(mobile_number && { mobile_number }),
      ...(email_address && { email_address }),
      ...(religion && { religion }),
      ...(citizenship && { citizenship }),
      ...(home_address && { home_address }),
      ...(region && { region }),
      ...(province && { province }),
      ...(municipality && { municipality }),
      ...(zip_code && { zip_code }),
      ...(guardian_name && { guardian_name }),
      ...(guardian_family_name && { guardian_family_name }),
      ...(guardian_first_name && { guardian_first_name }),
      ...(guardian_middle_name && { guardian_middle_name }),
      ...(guardian_relation && { guardian_relation }),
    };

    return super.update(id, dataToUpdate);
  }

  // Retrieve all pre-enrollments
  async getAll() {
    return super.getAll();
  }

  // Retrieve a pre-enrollment by ID
  async getById(id) {
    return super.getById(id);
  }

  // Delete a pre-enrollment by ID
  async delete(id) {
    return super.delete(id);
  }
}

export default PreEnrollmentRepository;
