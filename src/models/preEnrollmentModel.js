class PreEnrollment {
    constructor({
      enrollment_id,
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
    }) {
      this.enrollment_id = enrollment_id;
      this.last_name = last_name;
      this.first_name = first_name;
      this.middle_name = middle_name;
      this.suffix = suffix;
      this.date_of_birth = date_of_birth;
      this.place_of_birth = place_of_birth;
      this.age = age;
      this.status = status;
      this.mobile_number = mobile_number;
      this.email_address = email_address;
      this.religion = religion;
      this.citizenship = citizenship;
      this.home_address = home_address;
      this.region = region;
      this.province = province;
      this.municipality = municipality;
      this.zip_code = zip_code;
      this.guardian_name = guardian_name;
      this.guardian_family_name = guardian_family_name;
      this.guardian_first_name = guardian_first_name;
      this.guardian_middle_name = guardian_middle_name;
      this.guardian_relation = guardian_relation;
    }
  
    // Static method to create a PreEnrollment instance from a database row
    static fromDatabase(row) {
      return new PreEnrollment({
        enrollment_id: row.enrollment_id,
        last_name: row.last_name,
        first_name: row.first_name,
        middle_name: row.middle_name,
        suffix: row.suffix,
        date_of_birth: row.date_of_birth,
        place_of_birth: row.place_of_birth,
        age: row.age,
        status: row.status,
        mobile_number: row.mobile_number,
        email_address: row.email_address,
        religion: row.religion,
        citizenship: row.citizenship,
        home_address: row.home_address,
        region: row.region,
        province: row.province,
        municipality: row.municipality,
        zip_code: row.zip_code,
        guardian_name: row.guardian_name,
        guardian_family_name: row.guardian_family_name,
        guardian_first_name: row.guardian_first_name,
        guardian_middle_name: row.guardian_middle_name,
        guardian_relation: row.guardian_relation,
      });
    }
  }
  
  export default PreEnrollment;
  