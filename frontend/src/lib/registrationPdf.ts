import { R2_MEDIA } from './constants';

export interface PrintableRegistrationData {
  regNo?: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
  dob?: string;
  streetAddress?: string;
  city?: string;
  stateProvince?: string;
  zipCode?: string;
  email?: string;
  phone: string;
  whatsapp?: string;
  referral?: string;
  courseCategory?: string;
  coursePreference?: string;
  details?: string;
  preferredMode?: 'offline' | 'online' | string;
  duration?: string;
  totalFee?: string | number;
  paymentMethod?: string;
  termsAccepted?: boolean;
  signature?: string;
  signatureDate?: string;
  createdAt?: string;
}

export function generateRegistrationInnerHtml(data: PrintableRegistrationData): string {
  const regNumber = data.regNo || 'RK-2026-PENDING';
  const firstName = data.firstName || data.fullName?.split(' ')[0] || '';
  const lastName = data.lastName || data.fullName?.split(' ').slice(1).join(' ') || '';
  const dateStr = data.signatureDate || (data.createdAt ? new Date(data.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
  const modeText = data.preferredMode === 'online' ? 'Online' : 'Physical';

  return `
  <div style="width: 100%; max-width: 780px; margin: 0 auto; background: #ffffff; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; line-height: 1.35; box-sizing: border-box;">
    
    <!-- HEADER -->
    <table style="width: 100%; border-bottom: 2px solid #0A3663; padding-bottom: 8px; margin-bottom: 12px; border-collapse: collapse;">
      <tr>
        <td style="width: 75px; vertical-align: top;">
          <img src="${R2_MEDIA.brand.logo}" crossorigin="anonymous" style="width: 70px; height: 70px; object-fit: contain;" alt="RK Logo" onerror="this.style.display='none'" />
        </td>
        <td style="vertical-align: top; padding-left: 10px;">
          <div style="font-size: 18pt; font-weight: 900; color: #0A3663; letter-spacing: -0.5px; text-transform: uppercase; line-height: 1.1;">RK INTERNATIONAL</div>
          <div style="font-size: 13pt; font-weight: 900; color: #0098DA; text-transform: uppercase; line-height: 1.1; margin-top: 2px;">LANGUAGE ACADEMY</div>
          <div style="display: inline-block; font-size: 11pt; font-weight: 800; color: #0A3663; text-transform: uppercase; margin-top: 4px;">Student Registration Form</div>
          <div style="font-size: 8pt; color: #475569; margin-top: 4px; line-height: 1.4;">
            <strong>T.P:</strong> 074 0224 355 / 076 744 5019 &nbsp;|&nbsp; 
            <strong>Email:</strong> rkacademykili@gmail.com<br>
            <strong>Address:</strong> A-9 road, Near Theresamma kovil, Kilinochchi
          </div>
        </td>
        <td style="width: 160px; vertical-align: top; text-align: right;">
          <div style="border: 2px solid #0A3663; background: #f8fafc; padding: 6px 10px; border-radius: 4px; text-align: right;">
            <div style="font-size: 8pt; color: #64748b; font-weight: 600; text-transform: uppercase;">Registration No:</div>
            <div style="font-size: 12pt; font-weight: 800; color: #0098DA; font-family: monospace;">${regNumber}</div>
          </div>
        </td>
      </tr>
    </table>

    <!-- 01. STUDENT INFORMATION -->
    <div style="background-color: #B8DCF5; color: #0A3663; font-weight: 800; font-size: 9.5pt; padding: 4px 8px; border-radius: 3px; margin-top: 10px; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
      01. Student Information
    </div>
    <div style="display: flex; gap: 12px; margin-bottom: 5px;">
      <div style="flex: 1; display: flex; align-items: center; gap: 6px;">
        <span style="font-size: 8.5pt; font-weight: 700; color: #334155; min-width: 90px;">First Name :</span>
        <div style="flex: 1; border: 1px solid #94a3b8; background: #fff; padding: 3px 6px; min-height: 22px; font-size: 9pt; font-weight: 600; color: #0f172a; border-radius: 2px;">${firstName}</div>
      </div>
      <div style="flex: 1; display: flex; align-items: center; gap: 6px;">
        <span style="font-size: 8.5pt; font-weight: 700; color: #334155; min-width: 90px;">Last Name :</span>
        <div style="flex: 1; border: 1px solid #94a3b8; background: #fff; padding: 3px 6px; min-height: 22px; font-size: 9pt; font-weight: 600; color: #0f172a; border-radius: 2px;">${lastName}</div>
      </div>
    </div>
    <div style="display: flex; gap: 12px; margin-bottom: 5px;">
      <div style="flex: 1; display: flex; align-items: center; gap: 6px;">
        <span style="font-size: 8.5pt; font-weight: 700; color: #334155; min-width: 90px;">Date of Birth :</span>
        <div style="flex: 1; border: 1px solid #94a3b8; background: #fff; padding: 3px 6px; min-height: 22px; font-size: 9pt; font-weight: 600; color: #0f172a; border-radius: 2px;">${data.dob || ''}</div>
      </div>
      <div style="flex: 1; display: flex; align-items: center; gap: 6px;">
        <span style="font-size: 8.5pt; font-weight: 700; color: #334155; min-width: 90px;">Registration. No :</span>
        <div style="flex: 1; border: 1px solid #94a3b8; background: #fff; padding: 3px 6px; min-height: 22px; font-size: 9pt; font-family: monospace; font-weight: 800; color: #0098DA; border-radius: 2px;">${regNumber}</div>
      </div>
    </div>

    <!-- 02. ADDRESS -->
    <div style="background-color: #B8DCF5; color: #0A3663; font-weight: 800; font-size: 9.5pt; padding: 4px 8px; border-radius: 3px; margin-top: 10px; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
      02. Address
    </div>
    <div style="display: flex; gap: 12px; margin-bottom: 5px;">
      <div style="flex: 1; display: flex; align-items: center; gap: 6px;">
        <span style="font-size: 8.5pt; font-weight: 700; color: #334155; min-width: 90px;">Street Address :</span>
        <div style="flex: 1; border: 1px solid #94a3b8; background: #fff; padding: 3px 6px; min-height: 22px; font-size: 9pt; font-weight: 600; color: #0f172a; border-radius: 2px;">${data.streetAddress || ''}</div>
      </div>
      <div style="flex: 0.8; display: flex; align-items: center; gap: 6px;">
        <span style="font-size: 8.5pt; font-weight: 700; color: #334155; min-width: 60px;">City :</span>
        <div style="flex: 1; border: 1px solid #94a3b8; background: #fff; padding: 3px 6px; min-height: 22px; font-size: 9pt; font-weight: 600; color: #0f172a; border-radius: 2px;">${data.city || 'Kilinochchi'}</div>
      </div>
    </div>
    <div style="display: flex; gap: 12px; margin-bottom: 5px;">
      <div style="flex: 1; display: flex; align-items: center; gap: 6px;">
        <span style="font-size: 8.5pt; font-weight: 700; color: #334155; min-width: 90px;">State / Province :</span>
        <div style="flex: 1; border: 1px solid #94a3b8; background: #fff; padding: 3px 6px; min-height: 22px; font-size: 9pt; font-weight: 600; color: #0f172a; border-radius: 2px;">${data.stateProvince || 'Northern Province'}</div>
      </div>
      <div style="flex: 0.8; display: flex; align-items: center; gap: 6px;">
        <span style="font-size: 8.5pt; font-weight: 700; color: #334155; min-width: 60px;">Zip Code :</span>
        <div style="flex: 1; border: 1px solid #94a3b8; background: #fff; padding: 3px 6px; min-height: 22px; font-size: 9pt; font-weight: 600; color: #0f172a; border-radius: 2px;">${data.zipCode || ''}</div>
      </div>
    </div>

    <!-- 03. CONTACT INFORMATION -->
    <div style="background-color: #B8DCF5; color: #0A3663; font-weight: 800; font-size: 9.5pt; padding: 4px 8px; border-radius: 3px; margin-top: 10px; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
      03. Contact Information
    </div>
    <div style="display: flex; gap: 12px; margin-bottom: 5px;">
      <div style="flex: 1; display: flex; align-items: center; gap: 6px;">
        <span style="font-size: 8.5pt; font-weight: 700; color: #334155; min-width: 90px;">Email :</span>
        <div style="flex: 1; border: 1px solid #94a3b8; background: #fff; padding: 3px 6px; min-height: 22px; font-size: 9pt; font-weight: 600; color: #0f172a; border-radius: 2px;">${data.email || ''}</div>
      </div>
      <div style="flex: 1; display: flex; align-items: center; gap: 6px;">
        <span style="font-size: 8.5pt; font-weight: 700; color: #334155; min-width: 90px;">Mobile :</span>
        <div style="flex: 1; border: 1px solid #94a3b8; background: #fff; padding: 3px 6px; min-height: 22px; font-size: 9pt; font-family: monospace; font-weight: 600; color: #0f172a; border-radius: 2px;">${data.phone || ''}</div>
      </div>
    </div>

    <!-- 04. REFERRAL DETAILS -->
    <div style="background-color: #B8DCF5; color: #0A3663; font-weight: 800; font-size: 9.5pt; padding: 4px 8px; border-radius: 3px; margin-top: 10px; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
      04. Referral Details
    </div>
    <div style="display: flex; gap: 25px; font-size: 8.5pt; font-weight: 700; color: #334155; padding: 2px 0;">
      <div>Friends : <span style="display: inline-block; width: 16px; height: 16px; border: 1.5px solid #0A3663; border-radius: 2px; text-align: center; line-height: 14px; font-weight: 900; color: #0A3663; margin-left: 4px; background: #fff;">${data.referral === 'Friends' ? '✓' : ''}</span></div>
      <div>Social Media : <span style="display: inline-block; width: 16px; height: 16px; border: 1.5px solid #0A3663; border-radius: 2px; text-align: center; line-height: 14px; font-weight: 900; color: #0A3663; margin-left: 4px; background: #fff;">${data.referral === 'Social Media' ? '✓' : ''}</span></div>
      <div>Individual : <span style="display: inline-block; width: 16px; height: 16px; border: 1.5px solid #0A3663; border-radius: 2px; text-align: center; line-height: 14px; font-weight: 900; color: #0A3663; margin-left: 4px; background: #fff;">${data.referral === 'Individual' ? '✓' : ''}</span></div>
      <div>Other : <span style="display: inline-block; width: 16px; height: 16px; border: 1.5px solid #0A3663; border-radius: 2px; text-align: center; line-height: 14px; font-weight: 900; color: #0A3663; margin-left: 4px; background: #fff;">${(data.referral && !['Friends', 'Social Media', 'Individual'].includes(data.referral)) ? '✓' : ''}</span></div>
    </div>

    <!-- 05. COURSE DETAILS -->
    <div style="background-color: #B8DCF5; color: #0A3663; font-weight: 800; font-size: 9.5pt; padding: 4px 8px; border-radius: 3px; margin-top: 10px; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
      05. Course Details
    </div>
    <div style="display: flex; gap: 18px; font-size: 8.5pt; font-weight: 700; color: #334155; padding: 2px 0;">
      <div>English : <span style="display: inline-block; width: 16px; height: 16px; border: 1.5px solid #0A3663; border-radius: 2px; text-align: center; line-height: 14px; font-weight: 900; color: #0A3663; margin-left: 4px; background: #fff;">${(!data.courseCategory || data.courseCategory === 'English') ? '✓' : ''}</span></div>
      <div>Sinhala : <span style="display: inline-block; width: 16px; height: 16px; border: 1.5px solid #0A3663; border-radius: 2px; text-align: center; line-height: 14px; font-weight: 900; color: #0A3663; margin-left: 4px; background: #fff;">${data.courseCategory === 'Sinhala' ? '✓' : ''}</span></div>
      <div>Information Technology : <span style="display: inline-block; width: 16px; height: 16px; border: 1.5px solid #0A3663; border-radius: 2px; text-align: center; line-height: 14px; font-weight: 900; color: #0A3663; margin-left: 4px; background: #fff;">${data.courseCategory === 'Information Technology' ? '✓' : ''}</span></div>
      <div>French : <span style="display: inline-block; width: 16px; height: 16px; border: 1.5px solid #0A3663; border-radius: 2px; text-align: center; line-height: 14px; font-weight: 900; color: #0A3663; margin-left: 4px; background: #fff;">${data.courseCategory === 'French' ? '✓' : ''}</span></div>
      <div>Other : <span style="display: inline-block; width: 16px; height: 16px; border: 1.5px solid #0A3663; border-radius: 2px; text-align: center; line-height: 14px; font-weight: 900; color: #0A3663; margin-left: 4px; background: #fff;">${data.courseCategory === 'Other' ? '✓' : ''}</span></div>
    </div>
    <div style="display: flex; gap: 12px; margin-top: 5px;">
      <div style="flex: 1; display: flex; align-items: center; gap: 6px;">
        <span style="font-size: 8.5pt; font-weight: 700; color: #334155; min-width: 110px;">Selected Course :</span>
        <div style="flex: 1; border: 1px solid #94a3b8; background: #fff; padding: 3px 6px; min-height: 22px; font-size: 9pt; font-weight: 800; color: #0A3663; border-radius: 2px;">${data.coursePreference || 'IELTS & UKVI (Academic & General Training)'}</div>
      </div>
    </div>

    <!-- 06. DETAILS -->
    <div style="background-color: #B8DCF5; color: #0A3663; font-weight: 800; font-size: 9.5pt; padding: 4px 8px; border-radius: 3px; margin-top: 10px; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
      06. Details
    </div>
    <div style="border: 1px solid #94a3b8; padding: 5px 8px; min-height: 40px; font-size: 8.5pt; font-style: italic; color: #1e293b; background: #fff; border-radius: 2px;">
      ${data.details || 'Regular admission application.'}
    </div>

    <!-- 07, 08, 09, 10 -->
    <div style="background-color: #B8DCF5; color: #0A3663; font-weight: 800; font-size: 9.5pt; padding: 4px 8px; border-radius: 3px; margin-top: 10px; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
      07. Mode of Study &nbsp;&nbsp;|&nbsp;&nbsp; 08. Duration &nbsp;&nbsp;|&nbsp;&nbsp; 09. Course Fees &nbsp;&nbsp;|&nbsp;&nbsp; 10. Payment
    </div>
    <div style="display: flex; gap: 12px; margin-top: 5px;">
      <div style="flex: 1; display: flex; align-items: center; gap: 6px;">
        <span style="font-size: 8.5pt; font-weight: 700; color: #334155; min-width: 90px;">07. Mode :</span>
        <div style="font-size: 8.5pt; font-weight: 700;">
          Physical : <span style="display: inline-block; width: 16px; height: 16px; border: 1.5px solid #0A3663; border-radius: 2px; text-align: center; line-height: 14px; font-weight: 900; color: #0A3663; margin-left: 4px; background: #fff;">${modeText === 'Physical' ? '✓' : ''}</span>
          &nbsp;&nbsp;
          Online : <span style="display: inline-block; width: 16px; height: 16px; border: 1.5px solid #0A3663; border-radius: 2px; text-align: center; line-height: 14px; font-weight: 900; color: #0A3663; margin-left: 4px; background: #fff;">${modeText === 'Online' ? '✓' : ''}</span>
        </div>
      </div>
      <div style="flex: 1; display: flex; align-items: center; gap: 6px;">
        <span style="font-size: 8.5pt; font-weight: 700; color: #334155; min-width: 80px;">08. Duration :</span>
        <div style="flex: 1; border: 1px solid #94a3b8; background: #fff; padding: 3px 6px; min-height: 22px; font-size: 9pt; font-weight: 700; color: #0f172a; border-radius: 2px;">${data.duration || '8 Weeks'}</div>
      </div>
    </div>
    <div style="display: flex; gap: 12px; margin-top: 5px;">
      <div style="flex: 1; display: flex; align-items: center; gap: 6px;">
        <span style="font-size: 8.5pt; font-weight: 700; color: #334155; min-width: 90px;">09. Fees :</span>
        <div style="flex: 1; border: 1px solid #94a3b8; background: #fff; padding: 3px 6px; min-height: 22px; font-size: 9pt; font-weight: 800; color: #047857; border-radius: 2px;">${data.totalFee || '45,000 LKR'}</div>
      </div>
      <div style="flex: 1; display: flex; align-items: center; gap: 6px;">
        <span style="font-size: 8.5pt; font-weight: 700; color: #334155; min-width: 80px;">10. Payment :</span>
        <div style="font-size: 8.5pt; font-weight: 700;">
          Cash : <span style="display: inline-block; width: 16px; height: 16px; border: 1.5px solid #0A3663; border-radius: 2px; text-align: center; line-height: 14px; font-weight: 900; color: #0A3663; margin-left: 3px; background: #fff;">${(!data.paymentMethod || data.paymentMethod === 'Cash') ? '✓' : ''}</span>
          &nbsp;
          Check : <span style="display: inline-block; width: 16px; height: 16px; border: 1.5px solid #0A3663; border-radius: 2px; text-align: center; line-height: 14px; font-weight: 900; color: #0A3663; margin-left: 3px; background: #fff;">${data.paymentMethod === 'Check' ? '✓' : ''}</span>
          &nbsp;
          Card : <span style="display: inline-block; width: 16px; height: 16px; border: 1.5px solid #0A3663; border-radius: 2px; text-align: center; line-height: 14px; font-weight: 900; color: #0A3663; margin-left: 3px; background: #fff;">${data.paymentMethod === 'Card' ? '✓' : ''}</span>
          &nbsp;
          Other : <span style="display: inline-block; width: 16px; height: 16px; border: 1.5px solid #0A3663; border-radius: 2px; text-align: center; line-height: 14px; font-weight: 900; color: #0A3663; margin-left: 3px; background: #fff;">${data.paymentMethod === 'Other' ? '✓' : ''}</span>
        </div>
      </div>
    </div>

    <!-- 11. TERMS AND CONDITIONS -->
    <div style="background-color: #B8DCF5; color: #0A3663; font-weight: 800; font-size: 9.5pt; padding: 4px 8px; border-radius: 3px; margin-top: 10px; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
      11. Term and conditions :
    </div>
    <div style="border: 1px solid #cbd5e1; padding: 6px 8px; border-radius: 2px; background: #fdfdfd; font-size: 7.5pt; color: #1e293b; line-height: 1.35;">
      <div style="margin-bottom: 4px;">
        <strong>1.</strong> I / We certify that the above information provided by me / us is correct.
        <div style="color: #475569; padding-left: 12px; font-size: 7pt;">என்னால் வழங்கப்பட்ட தகவல்கள் அனைத்தும் உண்மையானவை என உறுதியளிக்கின்றேன்.</div>
      </div>
      <div style="margin-bottom: 4px;">
        <strong>2.</strong> I undertake to submit all the documents in original for verification.
        <div style="color: #475569; padding-left: 12px; font-size: 7pt;">என்னால் வழங்கப்பட்ட ஆவணங்கள் அனைத்தும் உண்மையானவை</div>
      </div>
      <div style="margin-bottom: 4px;">
        <strong>3.</strong> The admission fee and course fee are strictly non-refundable, and applicants are advised to carefully consider their decision to enroll, as the fees paid are not eligible for reimbursement at any stage of the admission or enrollment process.
        <div style="color: #475569; padding-left: 12px; font-size: 7pt;">நுழைவுக்கட்டணம் மற்றும் கற்கைநெறி கட்டணம் கண்டிப்பாக மீள்செலுத்தப்பட முடியாது...</div>
      </div>
      <div style="margin-bottom: 2px;">
        <strong>4.</strong> Admission offers are valid for a period of one year from the date of acceptance.
        <div style="color: #475569; padding-left: 12px; font-size: 7pt;">நுழைவுச் சலுகைகள் ஏற்றுக்கொள்ளப்பட்ட நாளிலிருந்து ஒரு வருட காலத்திற்குச் செல்லுபடியாகும்.</div>
      </div>
    </div>

    <!-- SIGNATURE & DATE -->
    <table style="width: 100%; margin-top: 10px; border-collapse: collapse;">
      <tr>
        <td style="width: 45%; vertical-align: top;">
          <div style="font-size: 8.5pt; font-weight: 700; color: #475569; margin-bottom: 2px;">Date:</div>
          <div style="border-bottom: 1.5px solid #0A3663; padding: 4px 2px; font-weight: 700; font-family: monospace; font-size: 9.5pt;">
            ${dateStr}
          </div>
        </td>
        <td style="width: 10%;"></td>
        <td style="width: 45%; text-align: right; vertical-align: top;">
          <div style="font-size: 8.5pt; font-weight: 700; color: #475569; margin-bottom: 2px;">Signature of student / Guardian:</div>
          <div style="border-bottom: 1.5px solid #0A3663; padding: 4px 2px; font-weight: 800; font-style: italic; font-family: serif; font-size: 11pt; color: #0A3663;">
            ${data.signature || data.fullName}
          </div>
        </td>
      </tr>
    </table>

  </div>
  `;
}

export function generateRegistrationHtml(data: PrintableRegistrationData): string {
  const regNumber = data.regNo || 'RK-2026-PENDING';
  const inner = generateRegistrationInnerHtml(data);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Student Registration Form - ${regNumber} - RK International Language Academy</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 12mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background: #ffffff;
      color: #0f172a;
    }
    @media print {
      .no-print { display: none !important; }
      body { background: transparent; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="position: fixed; top: 12px; right: 12px; z-index: 9999; display: flex; gap: 8px;">
    <button onclick="window.print()" style="padding: 10px 18px; background: #0A3663; color: #fff; border: none; border-radius: 8px; font-weight: 700; font-size: 13px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
      🖨️ Print / Save as PDF
    </button>
  </div>
  ${inner}
</body>
</html>`;
}

/**
 * Downloads a real, authentic .pdf file directly to the user's computer or mobile phone.
 */
export async function downloadRegistrationPDF(data: PrintableRegistrationData): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    // Dynamic import to avoid SSR issues
    const { default: jsPDF } = await import('jspdf');
    const { default: html2canvas } = await import('html2canvas');

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '-99999px';
    container.style.left = '-99999px';
    container.style.width = '794px'; // ~210mm at 96 DPI
    container.style.background = '#ffffff';
    container.style.padding = '0';
    container.style.margin = '0';
    container.style.zIndex = '-9999';
    container.style.boxSizing = 'border-box';
    container.innerHTML = generateRegistrationInnerHtml(data);
    document.body.appendChild(container);

    // Wait for images and web fonts
    const imgs = Array.from(container.querySelectorAll('img'));
    await Promise.race([
      Promise.all(
        imgs.map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise<void>((resolve) => {
            img.addEventListener('load', () => resolve(), { once: true });
            img.addEventListener('error', () => resolve(), { once: true });
          });
        })
      ),
      new Promise((resolve) => setTimeout(resolve, 2500)),
    ]);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const canvas = await html2canvas(container, {
      scale: 2, // 300 DPI high resolution
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    document.body.removeChild(container);

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = 210;
    const pdfHeight = 297;
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 5) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    const filename = `RK_Academy_Registration_${data.regNo || 'form'}.pdf`;
    pdf.save(filename);
  } catch (err) {
    console.error('Error generating PDF download:', err);
    // Fallback: trigger print dialog (which offers Save as PDF)
    printRegistrationForm(data);
  }
}

/**
 * Backwards compatibility alias for downloadRegistrationPDF.
 * Now saves a real .pdf file instead of .html!
 */
export async function downloadRegistrationDocument(data: PrintableRegistrationData): Promise<void> {
  return downloadRegistrationPDF(data);
}

/**
 * Opens a dedicated popup print window with the official 2-page document and triggers window.print()
 * (which prompts "Save as PDF" or Print directly in all modern browsers).
 */
export function printRegistrationForm(data: PrintableRegistrationData) {
  const html = generateRegistrationHtml(data);
  const printWindow = window.open('', '_blank', 'width=900,height=1100');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 400);
  }
}
