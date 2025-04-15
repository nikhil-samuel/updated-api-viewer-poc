export const sampleRequests = [
  // Successful claim submission
  {
    id: 'req-001',
    method: 'POST',
    endpoint: '/request',
    timestamp: '2025-04-15T10:30:45Z',
    statusCode: 201,
    amount: '$825.00',
    request: {
      request_type: 'reimbursement',
      request_id: 'REQ-2025-12345',
      submission_date: '2025-02-14',
      request: {
        policy_id: 'AW62-88-000111-HND',
        member_id: 'MEM12345',
        provider_id: 'PROV-123',
        event_date: '2025-02-14',
        payment_method: 'bank_transfer',
        medical_episode_id: 'EP-2025-12345',
        code: 'S82.101A',
        code_type: 'ICD10',
        description: 'Broken leg',
        custom_fields: {
          event_country: 'Honduras',
          is_preventive_care: false,
          is_accident: true,
          accident_details: {
            date: '2025-02-12',
            location: 'Hogar',
            description: 'Fall at home'
          },
          first_symptom_date: '2025-02-12',
          first_consultation_date: '2025-02-13',
          other_insurance: {
            has_other_coverage: true,
            company_name: 'Otra Aseguradora',
            policy_number: 'OA-12345'
          },
          hospitalization: {
            is_hospitalization: true,
            hospital_name: 'Hospital General',
            admission_date: '2025-02-14',
            discharge_date: '2025-02-16'
          },
          bank_account: {
            holder: 'Charles Heyer',
            account_type: 'CUENTA CORRIENTE',
            account_number: '12349008',
            swift_code: 'ATTDHNTE',
            bank_name: 'BANCO ATLANTIDA, S.A',
            bank_city: 'Tegucigalpa',
            currency: 'USD'
          }
        }
      },
      documents: [
        {
          document_type: 'invoice',
          file: '[binary data not shown - 1.2MB PDF]'
        },
        {
          document_type: 'medical_record',
          file: '[binary data not shown - 2.4MB PDF]'
        }
      ]
    },
    response: {
      id: 'SYS-REQ-001234',
      request_id: 'REQ-2025-12345',
      status: 'received',
      created_at: '2025-04-15T10:30:45Z',
      updated_at: '2025-04-15T10:30:45Z',
      message: 'Request received successfully',
      client_status: {
        bgla_status: 'in_clearinghouse',
        amigos_plus_id: 'AP-789012',
        docuface_id: 'DF-456789'
      }
    }
  },

  // 400 Bad Request - Missing required fields
  {
    id: 'req-002',
    method: 'POST',
    endpoint: '/request',
    timestamp: '2025-04-15T11:15:22Z',
    statusCode: 400,
    amount: '$534.00',
    request: {
      request_type: 'reimbursement',
      request_id: 'REQ-2025-12346',
      submission_date: '2025-02-15',
      request: {
        policy_id: 'AW62-88-000112-HND',
        member_id: 'MEM12346',
        provider_id: '',  // Missing provider ID
        event_date: '2025-02-15',
        payment_method: 'bank_transfer',
        description: 'Consultation for headache',
        custom_fields: {
          event_country: 'Honduras',
          is_preventive_care: false,
          is_accident: false,
          first_symptom_date: '2025-02-14',
          first_consultation_date: '2025-02-15',
          bank_account: {
            holder: 'Maria Rodriguez',
            account_type: 'CUENTA DE AHORRO',
            account_number: '98765432',
            swift_code: 'ATTDHNTE',
            bank_name: 'BANCO ATLANTIDA, S.A',
            bank_city: 'Tegucigalpa',
            currency: 'USD'
          }
        }
      },
      documents: [
        {
          document_type: 'invoice',
          file: '[binary data not shown - 0.8MB PDF]'
        }
      ]
    },
    response: {
      code: 400,
      message: 'Invalid request format',
      details: [
        {
          field: 'request.code',
          message: 'Diagnosis code is required'
        },
        {
          field: 'request.code_type',
          message: 'Diagnosis code type is required'
        }
      ]
    }
  },

  // 401 Unauthorized - Authentication failure
  {
    id: 'req-003',
    method: 'POST',
    endpoint: '/request',
    timestamp: '2025-04-15T09:45:12Z',
    statusCode: 401,
    amount: '$673.50',
    request: {
      request_type: 'reimbursement',
      request_id: 'REQ-2025-12347',
      submission_date: '2025-02-16',
      request: {
        policy_id: 'AW62-88-000113-HND',
        member_id: 'MEM12347',
        provider_id: 'PROV-456',
        event_date: '2025-02-16',
        payment_method: 'bank_transfer',
        code: 'J45.901',
        code_type: 'ICD10',
        description: 'Asthma exacerbation',
        custom_fields: {
          event_country: 'Honduras',
          is_preventive_care: false,
          is_accident: false,
          bank_account: {
            holder: 'Fernando Alvarez',
            account_type: 'CUENTA DE AHORRO',
            account_number: '45678123',
            swift_code: 'ATTDHNTE',
            bank_name: 'BANCO ATLANTIDA, S.A',
            bank_city: 'San Pedro Sula',
            currency: 'USD'
          }
        }
      },
      documents: [
        {
          document_type: 'invoice',
          file: '[binary data not shown - 0.7MB PDF]'
        }
      ]
    },
    response: {
      code: 401,
      message: 'Authorization failure',
      details: 'API key expired or invalid'
    }
  },

  // 403 Forbidden - Insufficient permissions
  {
    id: 'req-004',
    method: 'POST',
    endpoint: '/request',
    timestamp: '2025-04-15T14:22:33Z',
    statusCode: 403,
    amount: '$1,250.75',
    request: {
      request_type: 'reimbursement',
      request_id: 'REQ-2025-12348',
      submission_date: '2025-02-17',
      request: {
        policy_id: 'AW62-88-000114-HND',
        member_id: 'MEM12348',
        provider_id: 'PROV-789',
        event_date: '2025-02-17',
        payment_method: 'bank_transfer',
        code: 'K29.70',
        code_type: 'ICD10',
        description: 'Gastritis',
        custom_fields: {
          event_country: 'Honduras',
          is_preventive_care: false,
          is_accident: false,
          bank_account: {
            holder: 'Elena Morales',
            account_type: 'CUENTA CORRIENTE',
            account_number: '78901234',
            swift_code: 'ATTDHNTE',
            bank_name: 'BANCO ATLANTIDA, S.A',
            bank_city: 'Tegucigalpa',
            currency: 'USD'
          }
        }
      },
      documents: [
        {
          document_type: 'invoice',
          file: '[binary data not shown - 0.9MB PDF]'
        }
      ]
    },
    response: {
      code: 403,
      message: 'Permission denied',
      details: 'API key does not have permission to submit claims for the specified policy'
    }
  },

  // 404 Not Found - Invalid member or policy
  {
    id: 'req-005',
    method: 'POST',
    endpoint: '/request',
    timestamp: '2025-04-15T15:10:45Z',
    statusCode: 404,
    amount: '$475.25',
    request: {
      request_type: 'reimbursement',
      request_id: 'REQ-2025-12349',
      submission_date: '2025-02-18',
      request: {
        policy_id: 'AW62-88-000115-HND', // Policy doesn't exist
        member_id: 'MEM12349',
        provider_id: 'PROV-101',
        event_date: '2025-02-18',
        payment_method: 'bank_transfer',
        code: 'M54.5',
        code_type: 'ICD10',
        description: 'Low back pain',
        custom_fields: {
          event_country: 'Honduras',
          is_preventive_care: false,
          is_accident: false,
          bank_account: {
            holder: 'Carlos Sánchez',
            account_type: 'CUENTA DE AHORRO',
            account_number: '56789012',
            swift_code: 'ATTDHNTE',
            bank_name: 'BANCO ATLANTIDA, S.A',
            bank_city: 'La Ceiba',
            currency: 'USD'
          }
        }
      },
      documents: [
        {
          document_type: 'invoice',
          file: '[binary data not shown - 0.6MB PDF]'
        }
      ]
    },
    response: {
      code: 404,
      message: 'Resource not found',
      details: 'Policy AW62-88-000115-HND does not exist or is not active'
    }
  },

  // 409 Conflict - Duplicate submission
  {
    id: 'req-006',
    method: 'POST',
    endpoint: '/request',
    timestamp: '2025-04-15T16:05:18Z',
    statusCode: 409,
    amount: '$825.00', // Same as the first successful claim
    request: {
      request_type: 'reimbursement',
      request_id: 'REQ-2025-12350',
      submission_date: '2025-02-14', // Same date as the first claim
      request: {
        policy_id: 'AW62-88-000111-HND', // Same policy as the first claim
        member_id: 'MEM12345', // Same member as the first claim
        provider_id: 'PROV-123', // Same provider as the first claim
        event_date: '2025-02-14', // Same event date as the first claim
        payment_method: 'bank_transfer',
        medical_episode_id: 'EP-2025-12345', // Same episode as the first claim
        code: 'S82.101A', // Same diagnosis as the first claim
        code_type: 'ICD10',
        description: 'Broken leg',
        custom_fields: {
          event_country: 'Honduras',
          is_preventive_care: false,
          is_accident: true,
          bank_account: {
            holder: 'Charles Heyer',
            account_type: 'CUENTA CORRIENTE',
            account_number: '12349008',
            swift_code: 'ATTDHNTE',
            bank_name: 'BANCO ATLANTIDA, S.A',
            bank_city: 'Tegucigalpa',
            currency: 'USD'
          }
        }
      },
      documents: [
        {
          document_type: 'invoice',
          file: '[binary data not shown - 1.2MB PDF]' // Same invoice
        }
      ]
    },
    response: {
      code: 409,
      message: 'Request conflict',
      details: 'This claim appears to be a duplicate of an existing claim',
      duplicate_claim_id: 'REQ-2025-12345'
    }
  },

  // 413 Payload Too Large - File size too big
  {
    id: 'req-007',
    method: 'POST',
    endpoint: '/request',
    timestamp: '2025-04-15T17:30:22Z',
    statusCode: 413,
    amount: '$943.75',
    request: {
      request_type: 'reimbursement',
      request_id: 'REQ-2025-12351',
      submission_date: '2025-02-20',
      request: {
        policy_id: 'AW62-88-000117-HND',
        member_id: 'MEM12351',
        provider_id: 'PROV-202',
        event_date: '2025-02-20',
        payment_method: 'bank_transfer',
        code: 'J18.9',
        code_type: 'ICD10',
        description: 'Pneumonia',
        custom_fields: {
          event_country: 'Honduras',
          is_preventive_care: false,
          is_accident: false,
          bank_account: {
            holder: 'Patricia Mendoza',
            account_type: 'CUENTA CORRIENTE',
            account_number: '67890123',
            swift_code: 'ATTDHNTE',
            bank_name: 'BANCO ATLANTIDA, S.A',
            bank_city: 'Tegucigalpa',
            currency: 'USD'
          }
        }
      },
      documents: [
        {
          document_type: 'invoice',
          file: '[binary data not shown - 0.5MB PDF]'
        },
        {
          document_type: 'medical_record',
          file: '[binary data not shown - 25.7MB PDF]' // Extremely large file
        }
      ]
    },
    response: {
      code: 413,
      message: 'Payload Too Large',
      details: 'The attached document exceeds the maximum allowed size of 20MB'
    }
  },

  // 415 Unsupported Media Type - Wrong file format
  {
    id: 'req-008',
    method: 'POST',
    endpoint: '/request',
    timestamp: '2025-04-15T18:15:40Z',
    statusCode: 415,
    amount: '$312.50',
    request: {
      request_type: 'reimbursement',
      request_id: 'REQ-2025-12352',
      submission_date: '2025-02-21',
      request: {
        policy_id: 'AW62-88-000118-HND',
        member_id: 'MEM12352',
        provider_id: 'PROV-303',
        event_date: '2025-02-21',
        payment_method: 'bank_transfer',
        code: 'H10.10',
        code_type: 'ICD10',
        description: 'Acute conjunctivitis',
        custom_fields: {
          event_country: 'Honduras',
          is_preventive_care: false,
          is_accident: false,
          bank_account: {
            holder: 'Roberto Figueroa',
            account_type: 'CUENTA DE AHORRO',
            account_number: '89012345',
            swift_code: 'ATTDHNTE',
            bank_name: 'BANCO ATLANTIDA, S.A',
            bank_city: 'San Pedro Sula',
            currency: 'USD'
          }
        }
      },
      documents: [
        {
          document_type: 'invoice',
          file: '[binary data not shown - 1.1MB PNG]' // Not a PDF
        }
      ]
    },
    response: {
      code: 415,
      message: 'Unsupported Media Type',
      details: 'Only PDF documents are supported for invoice submissions'
    }
  },

  // 422 Unprocessable Entity - Data validation failed
  {
    id: 'req-009',
    method: 'POST',
    endpoint: '/request',
    timestamp: '2025-04-15T19:05:12Z',
    statusCode: 422,
    amount: '$1,870.25',
    request: {
      request_type: 'reimbursement',
      request_id: 'REQ-2025-12353',
      submission_date: '2025-02-22',
      request: {
        policy_id: 'AW62-88-000119-HND',
        member_id: 'MEM12353',
        provider_id: 'PROV-404',
        event_date: '2025-02-22',
        payment_method: 'bank_transfer',
        code: 'XYZ123', // Invalid diagnosis code
        code_type: 'ICD10',
        description: 'Heart surgery',
        custom_fields: {
          event_country: 'Honduras',
          is_preventive_care: false,
          is_accident: false,
          bank_account: {
            holder: 'Ana Martínez',
            account_type: 'CUENTA CORRIENTE',
            account_number: '90123456',
            swift_code: 'ATTDHNTE',
            bank_name: 'BANCO ATLANTIDA, S.A',
            bank_city: 'Tegucigalpa',
            currency: 'USD'
          }
        }
      },
      documents: [
        {
          document_type: 'invoice',
          file: '[binary data not shown - 1.3MB PDF]'
        }
      ]
    },
    response: {
      code: 422,
      message: 'Unprocessable Entity',
      details: [
        {
          field: 'request.code',
          message: 'XYZ123 is not a valid ICD10 code'
        }
      ]
    }
  },

  // 423 Locked - Policy on hold
  {
    id: 'req-010',
    method: 'POST',
    endpoint: '/request',
    timestamp: '2025-04-15T20:25:33Z',
    statusCode: 423,
    amount: '$425.00',
    request: {
      request_type: 'reimbursement',
      request_id: 'REQ-2025-12354',
      submission_date: '2025-02-23',
      request: {
        policy_id: 'AW62-88-000120-HND',
        member_id: 'MEM12354',
        provider_id: 'PROV-505',
        event_date: '2025-02-23',
        payment_method: 'bank_transfer',
        code: 'K35.80',
        code_type: 'ICD10',
        description: 'Appendicitis',
        custom_fields: {
          event_country: 'Honduras',
          is_preventive_care: false,
          is_accident: false,
          bank_account: {
            holder: 'Javier López',
            account_type: 'CUENTA DE AHORRO',
            account_number: '01234567',
            swift_code: 'ATTDHNTE',
            bank_name: 'BANCO ATLANTIDA, S.A',
            bank_city: 'Comayagua',
            currency: 'USD'
          }
        }
      },
      documents: [
        {
          document_type: 'invoice',
          file: '[binary data not shown - 0.9MB PDF]'
        }
      ]
    },
    response: {
      code: 423,
      message: 'Resource Locked',
      details: 'Policy AW62-88-000120-HND is currently on hold due to payment issues'
    }
  },

  // 429 Too Many Requests - Rate limit exceeded
  {
    id: 'req-011',
    method: 'POST',
    endpoint: '/request',
    timestamp: '2025-04-15T21:15:05Z',
    statusCode: 429,
    amount: '$567.25',
    request: {
      request_type: 'reimbursement',
      request_id: 'REQ-2025-12355',
      submission_date: '2025-02-24',
      request: {
        policy_id: 'AW62-88-000121-HND',
        member_id: 'MEM12355',
        provider_id: 'PROV-606',
        event_date: '2025-02-24',
        payment_method: 'bank_transfer',
        code: 'N39.0',
        code_type: 'ICD10',
        description: 'Urinary tract infection',
        custom_fields: {
          event_country: 'Honduras',
          is_preventive_care: false,
          is_accident: false,
          bank_account: {
            holder: 'Sofia Ramirez',
            account_type: 'CUENTA CORRIENTE',
            account_number: '12345678',
            swift_code: 'ATTDHNTE',
            bank_name: 'BANCO ATLANTIDA, S.A',
            bank_city: 'Tegucigalpa',
            currency: 'USD'
          }
        }
      },
      documents: [
        {
          document_type: 'invoice',
          file: '[binary data not shown - 0.7MB PDF]'
        }
      ]
    },
    response: {
      code: 429,
      message: 'Too Many Requests',
      details: 'Rate limit exceeded. Try again in 60 seconds',
      retry_after: 60
    }
  },

  // 500 Internal Server Error
  {
    id: 'req-012',
    method: 'POST',
    endpoint: '/request',
    timestamp: '2025-04-15T22:05:18Z',
    statusCode: 500,
    amount: '$732.50',
    request: {
      request_type: 'reimbursement',
      request_id: 'REQ-2025-12356',
      submission_date: '2025-02-25',
      request: {
        policy_id: 'AW62-88-000122-HND',
        member_id: 'MEM12356',
        provider_id: 'PROV-707',
        event_date: '2025-02-25',
        payment_method: 'bank_transfer',
        code: 'E11.9',
        code_type: 'ICD10',
        description: 'Type 2 diabetes',
        custom_fields: {
          event_country: 'Honduras',
          is_preventive_care: false,
          is_accident: false,
          bank_account: {
            holder: 'Miguel Torres',
            account_type: 'CUENTA DE AHORRO',
            account_number: '23456789',
            swift_code: 'ATTDHNTE',
            bank_name: 'BANCO ATLANTIDA, S.A',
            bank_city: 'San Pedro Sula',
            currency: 'USD'
          }
        }
      },
      documents: [
        {
          document_type: 'invoice',
          file: '[binary data not shown - 0.8MB PDF]'
        }
      ]
    },
    response: {
      code: 500,
      message: 'Internal Server Error',
      details: 'An unexpected error occurred while processing your request'
    }
  },

  // 502 Bad Gateway - Upstream service failure
  {
    id: 'req-013',
    method: 'POST',
    endpoint: '/request',
    timestamp: '2025-04-15T23:10:45Z',
    statusCode: 502,
    amount: '$915.75',
    request: {
      request_type: 'reimbursement',
      request_id: 'REQ-2025-12357',
      submission_date: '2025-02-26',
      request: {
        policy_id: 'AW62-88-000123-HND',
        member_id: 'MEM12357',
        provider_id: 'PROV-808',
        event_date: '2025-02-26',
        payment_method: 'bank_transfer',
        code: 'J44.9',
        code_type: 'ICD10',
        description: 'COPD',
        custom_fields: {
          event_country: 'Honduras',
          is_preventive_care: false,
          is_accident: false,
          bank_account: {
            holder: 'Isabella Vega',
            account_type: 'CUENTA CORRIENTE',
            account_number: '34567890',
            swift_code: 'ATTDHNTE',
            bank_name: 'BANCO ATLANTIDA, S.A',
            bank_city: 'Tegucigalpa',
            currency: 'USD'
          }
        }
      },
      documents: [
        {
          document_type: 'invoice',
          file: '[binary data not shown - 0.6MB PDF]'
        }
      ]
    },
    response: {
      code: 502,
      message: 'Bad Gateway',
      details: 'Unable to connect to the policy validation service'
    }
  },

  // 503 Service Unavailable - Maintenance
  {
    id: 'req-014',
    method: 'POST',
    endpoint: '/request',
    timestamp: '2025-04-16T00:20:33Z',
    statusCode: 503,
    amount: '$478.25',
    request: {
      request_type: 'reimbursement',
      request_id: 'REQ-2025-12358',
      submission_date: '2025-02-27',
      request: {
        policy_id: 'AW62-88-000124-HND',
        member_id: 'MEM12358',
        provider_id: 'PROV-909',
        event_date: '2025-02-27',
        payment_method: 'bank_transfer',
        code: 'M25.50',
        code_type: 'ICD10',
        description: 'Joint pain',
        custom_fields: {
          event_country: 'Honduras',
          is_preventive_care: false,
          is_accident: false,
          bank_account: {
            holder: 'Daniel Ortega',
            account_type: 'CUENTA DE AHORRO',
            account_number: '45678901',
            swift_code: 'ATTDHNTE',
            bank_name: 'BANCO ATLANTIDA, S.A',
            bank_city: 'La Ceiba',
            currency: 'USD'
          }
        }
      },
      documents: [
        {
          document_type: 'invoice',
          file: '[binary data not shown - 0.7MB PDF]'
        }
      ]
    },
    response: {
      code: 503,
      message: 'Service Unavailable',
      details: 'System is currently undergoing scheduled maintenance',
      retry_after: 3600
    }
  },

  // 504 Gateway Timeout - Operation took too long
  {
    id: 'req-015',
    method: 'POST',
    endpoint: '/request',
    timestamp: '2025-04-16T01:15:22Z',
    statusCode: 504,
    amount: '$1,042.75',
    request: {
      request_type: 'reimbursement',
      request_id: 'REQ-2025-12359',
      submission_date: '2025-02-28',
      request: {
        policy_id: 'AW62-88-000125-HND',
        member_id: 'MEM12359',
        provider_id: 'PROV-010',
        event_date: '2025-02-28',
        payment_method: 'bank_transfer',
        code: 'I10',
        code_type: 'ICD10',
        description: 'Hypertension',
        custom_fields: {
          event_country: 'Honduras',
          is_preventive_care: false,
          is_accident: false,
          bank_account: {
            holder: 'Valentina Castro',
            account_type: 'CUENTA CORRIENTE',
            account_number: '56789012',
            swift_code: 'ATTDHNTE',
            bank_name: 'BANCO ATLANTIDA, S.A',
            bank_city: 'Tegucigalpa',
            currency: 'USD'
          }
        }
      },
      documents: [
        {
          document_type: 'invoice',
          file: '[binary data not shown - 0.9MB PDF]'
        }
      ]
    },
    response: {
      code: 504,
      message: 'Gateway Timeout',
      details: 'Operation timed out while verifying policy details'
    }
  }
];
