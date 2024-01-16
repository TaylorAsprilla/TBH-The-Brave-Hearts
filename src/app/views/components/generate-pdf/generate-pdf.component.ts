import { jsPDF } from 'jspdf';
import { Component, Input, OnInit } from '@angular/core';

import { PolicyModel } from 'src/app/core/models/policy.model';
import { CustomerModel } from 'src/app/core/models/customer.model';
import {
  IBeneficiary,
  IReferral,
  IcontingentBeneficiary,
} from 'src/app/core/interfaces/policy.interface';

@Component({
  selector: 'app-generate-pdf',
  templateUrl: './generate-pdf.component.html',
  styleUrls: ['./generate-pdf.component.scss'],
})
export class GeneratePdfComponent implements OnInit {
  @Input() policyData: PolicyModel;
  @Input() customers: CustomerModel[];

  constructor() {}

  ngOnInit(): void {
    console.log('Policy', this.policyData);
  }

  generatePDF() {
    const customer = this.customers.find(
      (customer: CustomerModel) => customer.uid === this.policyData.customer._id
    );

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'legal',
    });

    let currentPage = 1;

    const marginLeft = 25;
    const marginBottom = 15;
    const marginRight = 25;
    const marginTop = 20;
    let currentY = marginTop;

    // Agregar una imagen (ejemplo usando una imagen en formato base64)
    const imageUrl = '/assets/images/logo-home.png'; // Reemplaza con tu propia imagen
    const imageWidth = 28; // Ancho de la imagen en unidades PDF (ajusta según sea necesario)
    const imageHeight = 22; // Altura de la imagen en unidades PDF (ajusta según sea necesario)

    // Obtener el ancho de la página
    const pageWidth = doc.internal.pageSize.width;
    // Calcular la posición x para centrar la imagen
    const imageX = (pageWidth - imageWidth) / 2;

    doc.addImage(imageUrl, 'PNG', imageX, currentY, imageWidth, imageHeight);

    // Ajustar la posición vertical después de agregar la imagen
    currentY += imageHeight + 15; // Ajusta según sea necesario

    // Título inicial del documento
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Policy', doc.internal.pageSize.getWidth() / 2, currentY - 5, {
      align: 'center',
    });
    currentY += 5;

    // Agregar información básica de la póliza
    currentY = this.addSectionToPDF(
      'Customer',
      [
        {
          label: 'Name',
          value: `${this.policyData.customer.firstName} ${customer?.middleName} ${this.policyData.customer.lastName}`,
        },
        {
          label: 'Address',
          value: `${customer?.address || ''}`,
        },
        {
          label: 'Address Line 2',
          value: `${customer?.addressLine2 || ''}`,
        },
        {
          label: 'City',
          value: `${customer?.city || ''}`,
        },
        {
          label: 'State',
          value: `${customer?.state || ''}`,
        },
        {
          label: 'Zip Code',
          value: `${customer?.zipCode || ''}`,
        },
        {
          label: 'Phone',
          value: `${customer?.phone || ''}`,
        },
        {
          label: 'Email',
          value: `${customer?.email || ''}`,
        },
        {
          label: 'Status In US',
          value: `${customer?.statusInUS || ''}`,
        },
        {
          label: 'SS / ITIN #',
          value: `${customer?.documentNumber || ''}`,
        },
        {
          label: 'Document Type',
          value: `${customer?.documentType || ''}`,
        },
        {
          label: 'Marital Status',
          value: `${customer?.maritalStatus || ''}`,
        },
        {
          label: 'Date Birth',
          value: `${this.formatDateToMMDDYYYY(customer?.dateBirth) || ''}`,
        },
        {
          label: 'Country Birth',
          value: `${customer?.countryBirth || ''}`,
        },
        {
          label: 'City Birth',
          value: `${customer?.cityBirth || ''}`,
        },
        {
          label: 'Gender',
          value: `${customer?.gender || ''}`,
        },
        {
          label: 'Weight',
          value: `${customer?.weight || ''}`,
        },
        {
          label: 'Height',
          value: `${customer?.height || ''}`,
        },
        {
          label: 'Employer Name',
          value: `${customer?.employerName || ''}`,
        },
        {
          label: 'Occupation',
          value: `${customer?.occupation || ''}`,
        },
        {
          label: 'Time Employed',
          value: `${customer?.timeEmployed || ''}`,
        },
        {
          label: 'Annual Income',
          value: `${customer?.annualIncome || ''}`,
        },
        {
          label: 'Household Income',
          value: `${customer?.householdIncome || ''}`,
        },
        {
          label: 'Household Net Worth',
          value: `${customer?.householdNetWorth || ''}`,
        },
      ],
      doc,
      marginLeft,
      marginRight,
      currentY
    );

    // Agregar información básica de la póliza
    currentY = this.addSectionToPDF(
      'Policy Information',
      [
        {
          label: 'Carrier',
          value: `${this.policyData.carrier || ''}`,
        },
        {
          label: 'Policy Type',
          value: `${this.policyData.policyType || ''}`,
        },
        {
          label: 'Monthly',
          value: `${this.policyData.monthly || ''}`,
        },
        {
          label: 'Face Amount',
          value: `${this.policyData.faceAmount || ''}`,
        },
        {
          label: 'Status',
          value: `${this.policyData.status || ''}`,
        },
      ],
      doc,
      marginLeft,
      marginRight,
      currentY
    );

    if (this.policyData.beneficiaries[0].firstName !== '') {
      // Agregar información de los beneficiarios
      currentY = this.addSectionToPDF(
        'Beneficiaries',
        this.policyData.beneficiaries.flatMap(
          (beneficiary: IBeneficiary, i: number) => [
            {
              label: `Beneficiary # ${i}`,
              value: ``,
            },
            {
              label: 'Name',
              value: `${beneficiary.firstName} ${beneficiary.middleName} ${beneficiary.lastName}`,
            },
            {
              label: 'Relationship To Insured',
              value: `${beneficiary.relationshipToInsured || ''} `,
            },
            {
              label: 'Phone',
              value: `${beneficiary.phone || ''}`,
            },
            {
              label: 'Email',
              value: `${beneficiary.email || ''}`,
            },
            {
              label: 'Date of Birth',
              value: `${
                this.formatDateToMMDDYYYY(beneficiary.dateBirth) || ''
              }`,
            },
            {
              label: 'SS',
              value: `${beneficiary.ss || ''}`,
            },
            {
              label: 'Share',
              value: `${beneficiary.share || ''}`,
            },
          ]
        ),
        doc,
        marginLeft,
        marginRight,
        currentY
      );
    }

    if (this.policyData.contingentBeneficiary[0].firstName !== '') {
      // Agregar información de beneficiarios contingentes
      currentY = this.addSectionToPDF(
        'Contingent Beneficiary',
        this.policyData.contingentBeneficiary.flatMap(
          (beneficiary: IcontingentBeneficiary, i: number) => [
            {
              label: `Contingent Beneficiary # ${i}`,
              value: ``,
            },
            {
              label: 'Name',
              value: `${beneficiary.firstName} ${beneficiary.middleName} ${beneficiary.lastName}`,
            },
            {
              label: 'Relationship To Insured',
              value: `${beneficiary.relationshipToInsured || ''}`,
            },
            {
              label: 'Phone',
              value: `${beneficiary.phone || ''}`,
            },
            {
              label: 'Email',
              value: `${beneficiary.email || ''}`,
            },
            {
              label: 'Date of Birth',
              value: `${
                this.formatDateToMMDDYYYY(beneficiary.dateBirth) || ''
              }`,
            },
            {
              label: 'SS',
              value: `${beneficiary.ss || ''}`,
            },
            {
              label: 'Share',
              value: `${beneficiary.share || ''}`,
            },
          ]
        ),
        doc,
        marginLeft,
        marginRight,
        currentY
      );
    }

    // Agregar información médica
    currentY = this.addSectionToPDF(
      'Medical Information',
      [
        {
          label: "Doctor's Name",
          value: `${this.policyData.medical.doctorName || ''}`,
        },
        {
          label: "Doctor's Office Location",
          value: `${this.policyData.medical.doctorOfficeLocation || ''}`,
        },
        {
          label: 'Office Phone Number',
          value: `${this.policyData.medical.officePhoneNumber || ''}`,
        },
        {
          label: 'Last Visit',
          value: `${
            this.formatDateToMMDDYYYY(this.policyData.medical.lastVisit) || ''
          }`,
        },
        {
          label: 'Reason for visit',
          value: `${this.policyData.medical.reasonForVisit || ''}`,
        },
        {
          label: 'Outcome of visit',
          value: `${this.policyData.medical.outcomeOfVisit || ''}`,
        },
        {
          label: 'Smoker',
          value: `${this.policyData.medical.smoker || ''}`,
        },
        {
          label: 'Medical Condition',
          value: `${this.policyData.medical.medicalCondition || ''}`,
        },
        {
          label: 'When it was diagnosed',
          value: `${this.policyData.medical.whenItWasDiagnosed || ''}`,
        },
        {
          label: 'Dosage',
          value: `${this.policyData.medical.dosage || ''}`,
        },
        {
          label: 'Additional information',
          value: `${this.policyData.medical.additionalInformation || ''}`,
        },
        {
          label: 'Is father alive',
          value: `${this.policyData.medical.isFatherAlive || ''}`,
        },
        {
          label: "Father's age",
          value: `${this.policyData.medical.fatherAge || ''}`,
        },
        {
          label: 'Cause of deceased',
          value: `${this.policyData.medical.deceasedFather || ''}`,
        },
        {
          label: 'Is mother alive',
          value: `${this.policyData.medical.isMotherAlive || ''}`,
        },
        {
          label: "Mother's age",
          value: `${this.policyData.medical.motherAge || ''}`,
        },
        {
          label: 'Cause of deceased',
          value: `${this.policyData.medical.deceasedMother || ''}`,
        },
        {
          label: 'Notes',
          value: `${this.policyData.medical.note || ''}`,
        },
      ],
      doc,
      marginLeft,
      marginRight,
      currentY
    );

    // Additional Questions
    currentY = this.addSectionToPDF(
      'Additional Questions',
      [
        {
          label: 'Criminal record',
          value: `${this.policyData.additionalQuestions.criminalRecord}`,
        },
        {
          label:
            'During the last 5 years have you pleaded guilty to or been convicted of any moving vehicle violation or DUI or have you had a suspended license?',
          value: `${this.policyData.additionalQuestions.pleadedGuilty}`,
        },
        {
          label:
            'Do you have another life insurance at this time? Excluding any from employer',
          value: `${this.policyData.additionalQuestions.anotherLife}`,
        },
        {
          label:
            'Have you ever applied for life, health, or disability insurance or reinstatement of same, which was declined, postponed, rated or modified in any way?',
          value: `${this.policyData.additionalQuestions.appliedForLife}`,
        },
        {
          label:
            'Do you participate in any motor sport, automobile, motorcycle, boat or marathon racing; scuba, skin, sport or sky diving;sports in which you compete against other individuals; parachuting; or hang gliding; BASE (parachute jumping from buildings, Antennas, Spans (bridges) or Earth) or bungee cord jumping; big game hunting; mountain climbing; caveexploring; rodeos or snowmobiling',
          value: `${this.policyData.additionalQuestions.participateSport}`,
        },
        {
          label:
            'Have you been or are you currently involved in any bankruptcy proceedings that have not been discharged?',
          value: `${this.policyData.additionalQuestions.involved}`,
        },
      ],
      doc,
      marginLeft,
      marginRight,
      currentY
    );

    currentY = this.addSectionToPDF(
      'Bank Information',
      [
        {
          label: 'Draft payment date',
          value: `${
            this.formatDateToMMDDYYYY(
              this.policyData.bankInformation.draftPaymentDate
            ) || ''
          }`,
        },
        {
          label: 'Bank/Credit Union name',
          value: `${this.policyData.bankInformation.bank || ''}`,
        },
        {
          label: 'Account Number',
          value: `${this.policyData.bankInformation.accountNumber || ''}`,
        },
        {
          label: 'Routing Number',
          value: `${this.policyData.bankInformation.routingNumber || ''}`,
        },
        {
          label: 'Notes',
          value: `${this.policyData.bankInformation.notes || ''}`,
        },
      ],
      doc,
      marginLeft,
      marginRight,
      currentY
    );

    if (this.policyData.referrals[0].firstName !== '') {
      // Agregar información de los beneficiarios
      currentY = this.addSectionToPDF(
        'Referrals',
        this.policyData.referrals.flatMap(
          (beneficiary: IReferral, i: number) => [
            {
              label: `Referrals # ${i}`,
              value: ``,
            },
            {
              label: 'Name',
              value: `${beneficiary.firstName} ${beneficiary.middleName} ${beneficiary.lastName}`,
            },
            {
              label: 'Relationship To Insured',
              value: `${beneficiary.relationshipToInsured || ''}`,
            },
            {
              label: 'Phone',
              value: `${beneficiary.phone || ''}`,
            },
            {
              label: 'Email',
              value: `${beneficiary.email || ''}`,
            },
          ]
        ),
        doc,
        marginLeft,
        marginRight,
        currentY
      );
    }

    currentY = this.addSectionToPDF(
      'Documents',
      [
        {
          label: "Primary Agent's Name",
          value: `${this.policyData.document.primaryAgentName || ''}`,
        },
        {
          label: '%',
          value: `${this.policyData.document.percentage1 || ''}`,
        },
        {
          label: "Secondary Agent's Name",
          value: `${this.policyData.document.secondaryAgentName || ''}`,
        },
        {
          label: '%',
          value: `${this.policyData.document.percentage2 || ''}`,
        },
        {
          label: "Field Training Agent's name",
          value: `${this.policyData.document.fieldTrainingAgent || ''}`,
        },
        {
          label: 'MB Base',
          value: `${this.policyData.document.mbBase || ''}`,
        },
      ],
      doc,
      marginLeft,
      marginRight,
      currentY
    );

    doc.save(
      `${this.policyData.customer.firstName} ${this.policyData.customer.lastName} - ${this.policyData.carrier}`
    );
  }

  addSectionToPDF = (
    title: string,
    content: { label: string; value: string }[],
    doc: any,
    marginLeft: number,
    marginRight: number,
    currentY: number
  ) => {
    currentY += 10;
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');

    let currentPage = 1;

    const maxLabelWidth = 180;
    const labelValueSpace = 10;
    const reducedMargin = 0;

    const marginBottom = 45;
    const marginTop = 40;
    const pageWidth = doc.internal.pageSize.width;
    const maxNoteWidth = pageWidth - marginLeft - marginRight - labelValueSpace;

    function startNewPage() {
      doc.addPage();
      currentY = marginTop;
      currentPage++;
    }

    if (currentY > doc.internal.pageSize.height - marginBottom) {
      startNewPage();
    }

    doc.text(title, marginLeft, currentY, { fontWeight: 'bold' });
    currentY += 15;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');

    content.forEach((item, index) => {
      if (currentY > doc.internal.pageSize.height - marginBottom - 10) {
        startNewPage();
      }

      if (!item || !item.label || !item.value) {
        return;
      }

      doc.setFont('helvetica', 'bold');

      // Calcular el ancho del label
      const labelWidth =
        doc.getStringUnitWidth(item.label) * doc.internal.getFontSize();

      // Verificar si el label es demasiado ancho
      if (labelWidth > maxLabelWidth) {
        const splitLabel = doc.splitTextToSize(item.label, maxLabelWidth);
        doc.text(splitLabel, marginLeft, currentY);
        currentY += 15;

        const noteLines = doc.splitTextToSize(item.value, maxNoteWidth);
        noteLines.forEach((line: string, lineIndex: number) => {
          currentY += labelValueSpace;
          doc.setFont('helvetica', 'normal');
          doc.text(
            line,
            marginLeft + labelValueSpace + reducedMargin,
            currentY
          );
        });
        currentY += 15;
      } else {
        doc.text(`${item.label}:`, marginLeft, currentY);
        doc.setFont('helvetica', 'normal');

        const noteLines = doc.splitTextToSize(item.value, maxNoteWidth);
        noteLines.forEach((line: string, lineIndex: number) => {
          if (lineIndex === 0) {
            currentY += labelValueSpace;
            doc.text(line, marginLeft + reducedMargin, currentY);
          } else {
            currentY += labelValueSpace;
            if (currentY > doc.internal.pageSize.height - marginBottom - 10) {
              startNewPage();
            }
            doc.text(line, marginLeft + reducedMargin, currentY);
          }
        });

        currentY += 10;
      }
    });

    return currentY;
  };

  formatDateToMMDDYYYY(inputDate: Date | undefined) {
    if (inputDate) {
      const date = new Date(inputDate);

      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear();

      return `${month}-${day}-${year}`;
    } else return;
  }
}
