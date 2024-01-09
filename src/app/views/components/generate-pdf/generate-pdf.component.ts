import { jsPDF } from 'jspdf';
import { Component, Input, OnInit } from '@angular/core';

import { PolicyModel } from 'src/app/core/models/policy.model';

@Component({
  selector: 'app-generate-pdf',
  templateUrl: './generate-pdf.component.html',
  styleUrls: ['./generate-pdf.component.scss'],
})
export class GeneratePdfComponent implements OnInit {
  @Input() policyData: PolicyModel;

  constructor() {}

  ngOnInit(): void {}

  // Función para generar el PDF
  generatePDF() {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'legal',
    });

    let currentPage = 1;

    const marginLeft = 15;
    const marginBottom = 15;
    const marginTop = 20;
    let currentY = marginTop;

    // Título inicial del documento
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Policy', doc.internal.pageSize.getWidth() / 2, currentY - 5, {
      align: 'center',
    });
    currentY += 10;

    // Agregar información básica de la póliza
    currentY = this.addSectionToPDF(
      'Customer',
      [
        `First Name: ${this.policyData.customer.firstName}`,
        `Last Name: ${this.policyData.customer.lastName}`,
        `Email: ${this.policyData.customer.email}`,
      ],
      doc,
      marginLeft,
      currentY
    );

    // Agregar información básica de la póliza
    currentY = this.addSectionToPDF(
      'Policy Information',
      [
        `Carrier: ${this.policyData.carrier}`,
        `Policy Type: ${this.policyData.policyType}`,
        `Monthly: ${this.policyData.monthly}`,
        `Face Amount: ${this.policyData.faceAmount}`,
      ],
      doc,
      marginLeft,
      currentY
    );

    // Agregar información de los beneficiarios
    currentY = this.addSectionToPDF(
      'Beneficiaries',
      this.policyData.beneficiaries.map((beneficiary: any) => {
        return Object.keys(beneficiary)
          .map((key) => `${key}: ${beneficiary[key]}`)
          .join('\n');
      }),

      doc,
      marginLeft,
      currentY
    );

    // Agregar información de beneficiarios contingentes
    currentY = this.addSectionToPDF(
      'Contingent Beneficiaries',
      this.policyData.contingentBeneficiary.map(
        (contingentBeneficiary: any) => {
          return Object.keys(contingentBeneficiary)
            .map((key) => `${key}: ${contingentBeneficiary[key]}`)
            .join('\n');
        }
      ),
      doc,
      marginLeft,
      currentY
    );

    // Agregar información médica
    currentY = this.addSectionToPDF(
      'Medical Information',
      [
        `Doctor's Name: ${this.policyData.medical.doctorName}`,
        `Doctor's Office Location: ${this.policyData.medical.doctorOfficeLocation}`,
        `Office Phone Number: ${this.policyData.medical.officePhoneNumber}`,
        `Last Visit: ${this.policyData.medical.lastVisit}`,
        `Reason for visit: ${this.policyData.medical.reasonForVisit}`,
        `Outcome of visit: ${this.policyData.medical.outcomeOfVisit}`,
        `Smoker: ${this.policyData.medical.smoker}`,
        `Medical Condition: ${this.policyData.medical.medicalCondition}`,
        `When it was diagnosed: ${this.policyData.medical.whenItWasDiagnosed}`,
        `Dosage: ${this.policyData.medical.dosage}`,
        `Additional information: ${this.policyData.medical.additionalInformation}`,
        `Is father alive: ${this.policyData.medical.isFatherAlive}`,
        `Father's age: ${this.policyData.medical.fatherAge}`,
        `Cause of deceased: ${this.policyData.medical.deceasedFather}`,
        `Is mother alive: ${this.policyData.medical.isMotherAlive}`,
        `Mother's age: ${this.policyData.medical.motherAge}`,
        `Cause of deceased: ${this.policyData.medical.deceasedMother}`,
        `Notes: ${this.policyData.medical.note}`,
      ],
      doc,
      marginLeft,
      currentY
    );

    // Additional Questions
    currentY = this.addSectionToPDF(
      'Additional Questions',
      [
        `* Criminal record: ${this.policyData.additionalQuestions.criminalRecord}`,
        `* During the last 5 years have you pleaded guilty to or been convicted of any moving vehicle violation or DUI or have you had a suspended license?:
          ${this.policyData.additionalQuestions.pleadedGuilty}`,
        `* Do you have another life insurance at this time? Excluding any from employer:
          ${this.policyData.additionalQuestions.anotherLife}`,
        `* Have you ever applied for life, health, or disability insurance or reinstatement of same, which was declined, postponed, rated or modified in any way?:
          ${this.policyData.additionalQuestions.appliedForLife}`,
        `* Do you participate in any motor sport, automobile, motorcycle, boat or marathon racing; scuba, skin, sport or sky diving;sports in which you compete against other individuals; parachuting; or hang gliding; BASE (parachute jumping from buildings, Antennas, Spans (bridges) or Earth) or bungee cord jumping; big game hunting; mountain climbing; caveexploring; rodeos or snowmobiling:
          ${this.policyData.additionalQuestions.participateSport}`,
        `* Have you been or are you currently involved in any bankruptcy proceedings that have not been discharged?:
        ${this.policyData.additionalQuestions.involved}`,
      ],
      doc,
      marginLeft,
      currentY
    );

    currentY = this.addSectionToPDF(
      'Bank Information',
      [
        `Draft payment date: ${this.policyData.bankInformation.draftPaymentDate}`,
        `Bank/Credit Union name: ${this.policyData.bankInformation.bank}`,
        `Account Number: ${this.policyData.bankInformation.accountNumber}`,
        `Routing Number: ${this.policyData.bankInformation.routingNumber}`,
        `Notes: ${this.policyData.bankInformation.notes}`,
      ],
      doc,
      marginLeft,
      currentY
    );

    // Agregar información de beneficiarios contingentes
    currentY = this.addSectionToPDF(
      'Referrals',
      this.policyData.referrals.map((referral: any) => {
        return Object.keys(referral)
          .map((key) => `${key}: ${referral[key]}`)
          .join('\n');
      }),
      doc,
      marginLeft,
      currentY
    );

    currentY = this.addSectionToPDF(
      'Documents',
      [
        `Primary Agent's Name: ${this.policyData.document.primaryAgentName}`,
        `%: ${this.policyData.document.percentage1}`,
        `Secondary Agent's Name: ${this.policyData.document.secondaryAgentName}`,
        `%: ${this.policyData.document.percentage2}`,
        `Field Training Agent's name: ${this.policyData.document.fieldTrainingAgent}`,
        `MB Base: ${this.policyData.document.mbBase}`,
      ],
      doc,
      marginLeft,
      currentY
    );

    doc.save(
      `${this.policyData.customer.firstName} ${this.policyData.customer.lastName} - ${this.policyData.carrier}`
    );
  }

  // Función para agregar secciones al PDF
  addSectionToPDF(
    title: string,
    content: string[],
    doc: any,
    marginLeft: number,
    currentY: number
  ) {
    currentY += 10;
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(title, marginLeft, currentY);
    currentY += 15; // Espacio después del título

    const marginBottom = 35;
    const marginTop = 30;

    let currentPage = 1;
    let maxPageHeight = doc.internal.pageSize.height - marginBottom;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    content.forEach((item, index) => {
      if (currentY > maxPageHeight) {
        doc.addPage();
        currentPage++;
        currentY = marginTop;
        doc.setFontSize(10);
        doc.text(`${title} (Contd.)`, marginLeft, currentY);
        currentY += 15; // Espacio después del título de continuación en una nueva página
      }

      doc.setFontSize(12);
      const splitContent = doc.splitTextToSize(
        item,
        doc.internal.pageSize.width - marginLeft * 2
      );
      splitContent.forEach((line: any, i: any) => {
        doc.text(line, marginLeft, currentY);
        currentY += 10; // Espacio entre líneas
      });
    });

    return currentY;
  }
}
