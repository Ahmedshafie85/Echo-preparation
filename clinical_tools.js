/* Clinical calculators and cutoff library. */

const CLINICAL_VALUE_SETS = [
  {
    id:'rapid', title:'Rapid-revision essentials', page:'228',
    rows:[
      ['LVEF','Men >=52%; women >=54%','Common exam/management shorthand: >=55%.'],
      ['Left atrial volume index','<=34 mL/m2','Use indexed volume, not AP diameter.'],
      ['LV mass index','Men <=115; women <=95 g/m2','Above these values supports LV hypertrophy.'],
      ['RV size/function','Basal <=41 mm; TAPSE >=17 mm; S\u2032 >=9.5 cm/s; FAC >=35%; 3D RVEF >=45%','Use an RV-focused apical view.'],
      ['Severe AS','Vmax >=4 m/s; mean gradient >=40 mmHg; AVA <1.0 cm2; DVI <0.25','Very severe: Vmax >=5 m/s or mean gradient >=60 mmHg.'],
      ['Severe primary MR','EROA >=0.40 cm2; RegVol >=60 mL; VC >=0.7 cm','Integrate pulmonary-vein flow and chamber response.'],
      ['Severe AR','VC >0.6 cm; PHT <200 ms; holodiastolic aortic reversal','The reversal sign is especially specific.'],
      ['Severe TR','VC >=0.7 cm; EROA >=0.40 cm2; RegVol >=45 mL','Massive VC 1.4-2.0 cm; torrential >=2.1 cm.']
    ]
  },
  {
    id:'lv-grade', title:'LV dimensions, volumes and EF grades', page:'39',
    rows:[
      ['LVEDD - men','Normal 42-58 mm; mild 59-63; moderate 64-68; severe >=69','Measure perpendicular to the LV long axis.'],
      ['LVEDD - women','Normal 38-52 mm; mild 53-56; moderate 57-61; severe >=62','Sex-specific grading matters.'],
      ['LV EDV index - men','Normal 34-74 mL/m2; mild 75-89; moderate 90-100; severe >100','Use non-foreshortened biplane Simpson or 3D.'],
      ['LV EDV index - women','Normal 29-61 mL/m2; mild 62-70; moderate 71-80; severe >80','Index to BSA.'],
      ['LVEF - men','Normal 52-72%; mild 41-51; moderate 30-40; severe <30','Loading conditions can mislead EF.'],
      ['LVEF - women','Normal 54-74%; mild 41-53; moderate 30-40; severe <30','In severe MR, EF <=60% is already abnormal.'],
      ['Wall thickness - men','Normal <=10 mm; mild 11-13; moderate 14-16; severe >=17','Septal or posterior wall.'],
      ['Wall thickness - women','Normal <=9 mm; mild 10-12; moderate 13-15; severe >=16','Interpret distribution, not thickness alone.'],
      ['LV mass index - men','Normal <=115 g/m2; mild 116-131; moderate 132-148; severe >=149','Pair with RWT to name remodeling.'],
      ['LV mass index - women','Normal <=95 g/m2; mild 96-108; moderate 109-121; severe >=122','RWT >0.42 is increased.']
    ]
  },
  {
    id:'la', title:'Left atrial size and remodeling', page:'37-40',
    rows:[
      ['LAVI','Normal <=34 mL/m2; mild 35-41; moderate 42-48; severe >48','Measured at end-systole; exclude pulmonary veins and LAA.'],
      ['LA AP diameter','Do not grade LA size from diameter alone','A single PLAX diameter misses asymmetric enlargement and is not indexed.'],
      ['Preferred method','Biplane disk summation or area-length, indexed to BSA','Use dedicated non-foreshortened A4C and A2C views.'],
      ['LARS in diastology','<=18% supports elevated LAP','Apply only in an appropriate rhythm and disease context.']
    ]
  },
  {
    id:'rv', title:'Right-heart dimensions and function', page:'44-45, 67',
    rows:[
      ['RA area','<19 cm2','End-systole; exclude venae cavae and appendage.'],
      ['RA volume index','<30 mL/m2 by disks; <33 mL/m2 by area-length','RA-focused apical view.'],
      ['RV basal diameter','<4.1 cm','Maximal basal width in RV-focused end-diastole.'],
      ['RV mid diameter','<3.5 cm','Perpendicular to the long axis.'],
      ['RV longitudinal length','<8.2 cm','Annular plane to apex.'],
      ['RV free-wall thickness','<0.5 cm','Subcostal, end-diastole.'],
      ['3D RV EDV index','<90 mL/m2','Echo may underestimate CMR volume.'],
      ['TAPSE','Normal >=17 mm','Longitudinal index; less reliable after cardiac surgery.'],
      ['RV S\u2032','Normal >=9.5 cm/s','Align basal RV and annulus with the TDI cursor.'],
      ['RV FAC','Normal >=35%','Trace the compacted border in an RV-focused view.'],
      ['3D RVEF','Normal >=45%','Preferred volumetric functional measure when feasible.'],
      ['RV free-wall strain','Abnormal if less negative than about -20%','Vendor and loading dependent.'],
      ['TAPSE/PASP','<0.3-0.4 mm/mmHg suggests RV-PA uncoupling','Interpret with TR-envelope quality.']
    ]
  },
  {
    id:'diastolic', title:'Diastolic function and filling pressure', page:'73-82',
    rows:[
      ['Reduced e\u2032 gateway','Septal <=6; lateral <=7; average <=6.5 cm/s','2025 pathway. Age-specific limits may also be used.'],
      ['Elevated E/e\u2032','Average >=14; septal >=15; lateral >=13','A workhorse estimate, not a stand-alone diagnosis.'],
      ['TR / pulmonary pressure','TR-V >=2.8 m/s or PASP >=35 mmHg','PH itself can confound this marker.'],
      ['LA markers','LAVI >34 mL/m2; LARS <=18%','LAVI is chronic; LARS can adjudicate discordance.'],
      ['Pulmonary-vein support','S/D <1; <=0.67 strongly supportive','Peak Ar >=35 cm/s or Ar-A >=30 ms supports elevated LVEDP.'],
      ['Grade I','E/A <0.8; DT usually >220 ms; normal LAP at rest','Impaired relaxation.'],
      ['Grade II','E/A 0.8-2 with elevated LAP','Pseudonormal; e\u2032 remains reduced.'],
      ['Grade III','E/A >=2; DT usually <160 ms; markedly elevated LAP','Restrictive physiology.'],
      ['Diastolic stress','E/e\u2032 >=14 and TR-V >3.2 m/s','Both are required for a definitely positive test.'],
      ['AF markers','E >=100 cm/s; septal E/e\u2032 >11; TR-V >2.8/PASP >35; DT <=160; PV S/D <1; LARS <18%','Average representative matched beats.'],
      ['Moderate/severe MAC','E/A <0.8 usually normal LAP; >1.8 elevated; 0.8-1.8 use IVRT >=80 normal vs <80 elevated','Do not use annular e\u2032 or E/e\u2032.']
    ]
  },
  {
    id:'as', title:'Aortic stenosis', page:'126-133',
    rows:[
      ['Mild AS','Vmax 2.6-2.9 m/s; mean gradient <20 mmHg; AVA >1.5 cm2','Keep all three measures in context.'],
      ['Moderate AS','Vmax 3.0-3.9 m/s; mean gradient 20-39 mmHg; AVA 1.0-1.5 cm2','Audit flow and Doppler alignment when discordant.'],
      ['Severe AS','Vmax >=4.0 m/s; mean gradient >=40 mmHg; AVA <1.0 cm2','AVA index <0.6 cm2/m2; DVI <0.25.'],
      ['Very severe AS','Vmax >=5.0 m/s or mean gradient >=60 mmHg','Changes risk and management.'],
      ['Low flow','SVi <35 mL/m2','Classic if EF <50%; paradoxical if EF >=50%.'],
      ['CT calcium - severe likely','Men >=2000 AU; women >=1200 AU','Very likely: men >=3000; women >=1600 AU.']
    ]
  },
  {
    id:'ms', title:'Mitral and right-sided stenosis', page:'129-133',
    rows:[
      ['Mitral valve area','Severe/significant <=1.5 cm2; very severe <=1.0 cm2','Planimetry is the reference when feasible.'],
      ['Pressure half-time','MVA = 220 / PHT','Invalid after PBMV, with significant AR, or MAC-related MS.'],
      ['Wilkins score','<=8 favors PBMV','Requires no LA thrombus and no significant MR.'],
      ['Exercise MS support','Mean gradient >15 mmHg or PASP >60 mmHg','Supportive, not a stand-alone intervention rule.'],
      ['Severe tricuspid stenosis','Mean gradient >5-7 mmHg; PHT >190 ms; area <=1.0 cm2','Average at least 3 beats and report HR.'],
      ['Severe pulmonary stenosis','Vmax >4 m/s; peak gradient >64; mean gradient >35 mmHg','Moderate PS: Vmax 3-4 m/s, peak 36-64.']
    ]
  },
  {
    id:'mr', title:'Mitral regurgitation', page:'137-144',
    rows:[
      ['Severe primary MR','EROA >=0.40 cm2; RegVol >=60 mL; RegFrac >=50%; VC >=0.7 cm','Support with systolic pulmonary-vein reversal and chamber response.'],
      ['Severe secondary MR - ESC 2025','EROA >=0.30 cm2 and/or RegVol >=45 mL','For relevant low-flow/elliptical-orifice geometry; integrate mechanism and consequences.'],
      ['Primary MR intervention flags','LVEF <=60% or LVESD >=40 mm','Also symptoms, new AF, pulmonary hypertension and repairability.'],
      ['PISA flow','2\u03c0r2 x aliasing velocity','EROA = flow / peak jet velocity; RegVol = EROA x jet VTI.'],
      ['Important pitfall','Do not grade eccentric Coanda jets by color area','Use VC, PISA/3D VCA, pulmonary veins and remodeling.']
    ]
  },
  {
    id:'ar', title:'Aortic regurgitation', page:'140-144',
    rows:[
      ['Severe AR','VC >0.6 cm; jet/LVOT >=65%; PHT <200 ms','Integrate, because PHT is compliance and pressure dependent.'],
      ['Quantitative severe AR','EROA >=0.30 cm2; RegVol >=60 mL','Confirm with chamber response and flow reversal.'],
      ['Most specific support','Holodiastolic flow reversal in descending/abdominal aorta','Especially useful for eccentric jets.'],
      ['Standard intervention flags','Symptoms; EF <=50%; LVESD >50 mm; LVESDi >25 mm/m2','Earlier thresholds may apply in selected low-risk patients.'],
      ['Acute severe AR','Normal LV size does not exclude it','Look for short PHT, premature mitral closure and urgent mechanism assessment.']
    ]
  },
  {
    id:'tr', title:'Tricuspid and pulmonary regurgitation', page:'141-144',
    rows:[
      ['Severe TR','VC >=0.7 cm; EROA >=0.40 cm2; RegVol >=45 mL','Support with systolic hepatic-vein reversal and RA/RV dilation.'],
      ['Massive TR','VC 1.4-2.0 cm; EROA 0.60-0.79 cm2; RegVol 60-74 mL','High-severity tier.'],
      ['Torrential TR','VC >=2.1 cm; EROA >=0.80 cm2; RegVol >=75 mL','Velocity may be low because RA/RV pressures equalize.'],
      ['Severe PR','Jet width >50% RVOT; branch-PA holodiastolic reversal; dense CW; PHT <100 ms','PHT shortens with high RVEDP; CMR is the RV-volume reference.']
    ]
  },
  {
    id:'prosthetic', title:'Prosthetic valves and mismatch', page:'228, 247',
    rows:[
      ['Aortic SAVR - expected','Mean <20 mmHg; DVI >0.35; AT <80 ms','Always compare valve type, size and baseline.'],
      ['Aortic obstruction pattern','Mean >=35 mmHg; DVI <0.25; AT >100 ms','0.25-0.35 is an intermediate DVI zone.'],
      ['Mitral obstruction pattern','Mean >10 mmHg; peak velocity >1.9 m/s; DVI >2.5','Strongly heart-rate dependent.'],
      ['Tricuspid bioprosthesis','Mean <6 mmHg expected; 6-9 acceptable; >9 suggests obstruction','2024 ASE population threshold.'],
      ['Severe aortic PPM','iEOA <=0.65 cm2/m2 if BMI <30; <=0.55 if BMI >=30','Interpret against the prosthesis reference.'],
      ['Severe mitral PPM','iEOA <=0.90 cm2/m2 if BMI <30; <=0.75 if BMI >=30','High gradient alone does not prove obstruction.']
    ]
  },
  {
    id:'formula', title:'Hemodynamic formulas', page:'224-228',
    rows:[
      ['Cross-sectional area','CSA = 0.785 x diameter2','Diameter error is squared.'],
      ['Stroke volume / output','SV = CSA x VTI; CO = SV x HR; CI = CO / BSA','Keep units consistent.'],
      ['Aortic valve area','AVA = (CSA x VTI)LVOT / VTIAV','DVI = VTILVOT / VTIAV.'],
      ['PASP / RVSP','4(TR velocity)2 + RAP','PASP only if no pulmonic/RVOT/conduit obstruction.'],
      ['Mean LAP from MR','LV systolic pressure - 4(MR peak velocity)2','Assumes cuff SBP approximates LV pressure and no LVOT/AV obstruction.'],
      ['LVEDP from AR','Aortic DBP - 4(AR end-diastolic velocity)2','Requires a complete envelope and reasonable central DBP estimate.'],
      ['PISA','Flow = 2\u03c0r2 x Valias; EROA = flow/Vpeak; RegVol = EROA x VTIjet','Elliptical or multiple jets can defeat hemispheric PISA.'],
      ['Qp/Qs','(CSA x VTI)RVOT / (CSA x VTI)LVOT','>=1.5 is significant when chamber loading agrees.']
    ]
  }
];

window.ClinicalTools = {
  population:'general',

  _el(id){ return document.getElementById(id); },
  _num(id){
    const el=this._el(id);
    if(!el || String(el.value).trim()==='') return null;
    const n=Number(el.value);
    return Number.isFinite(n) ? n : null;
  },
  _esc(value){
    return String(value==null?'':value)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  },
  _state(value){ return value===true?'positive':value===false?'negative':'missing'; },
  _marker(name,value,positiveText,negativeText){
    return {name,value,text:value===true?positiveText:value===false?negativeText:'Not entered'};
  },

  init(){
    const select=this._el('clinicalValueSet');
    if(select && !select.options.length){
      select.innerHTML=CLINICAL_VALUE_SETS.map(s=>`<option value="${s.id}">${this._esc(s.title)}</option>`).join('');
    }
    const pop=this._el('ddPopulation');
    if(pop) this.setPopulation(pop.value||'general',false);
    this.renderReference();
  },

  setPopulation(value,clear=true){
    this.population=value||'general';
    document.querySelectorAll('[data-dd-pop]').forEach(el=>{
      const allowed=(el.dataset.ddPop||'').split(' ');
      el.style.display=allowed.includes(this.population)?'grid':'none';
    });
    const note=this._el('ddPopulationNote');
    if(note){
      const notes={
        general:'Use only for the general sinus-rhythm population. Do not force this pathway onto significant MR/MS, mitral repair or prosthesis, moderate/severe MAC, AF, transplant, noncardiac PH, constriction or LVAD.',
        af:'AF has no A wave and no formal Grade I-III assignment. The tool summarizes the available 2025 pressure markers across representative matched beats.',
        mac:'For moderate/severe MAC, annular e\u2032 and E/e\u2032 are unreliable. Use E/A first, then IVRT when E/A is 0.8-1.8.'
      };
      note.textContent=notes[this.population]||'';
    }
    if(clear) this.clearResult();
  },

  clearResult(){
    const result=this._el('ddResult');
    if(result) result.innerHTML='<div class="ct-empty">Enter the available measurements. Blank fields are ignored.</div>';
  },

  reset(){
    document.querySelectorAll('#diastolicCalculator input').forEach(input=>input.value='');
    const pop=this._el('ddPopulation');
    if(pop) pop.value='general';
    this.setPopulation('general');
  },

  calculate(){
    if(this.population==='af') return this._calculateAF();
    if(this.population==='mac') return this._calculateMAC();
    return this._calculateGeneral();
  },

  _ePrimeState(){
    const septal=this._num('ddSeptalEprime');
    const lateral=this._num('ddLateralEprime');
    if(septal!=null && lateral!=null){
      const avg=(septal+lateral)/2;
      return {value:avg<=6.5, label:`Average e\u2032 ${avg.toFixed(1)} cm/s`, detail:avg<=6.5?'Reduced (<=6.5)':'Preserved (>6.5)'};
    }
    if(septal!=null) return {value:septal<=6,label:`Septal e\u2032 ${septal.toFixed(1)} cm/s`,detail:septal<=6?'Reduced (<=6)':'Preserved (>6)'};
    if(lateral!=null) return {value:lateral<=7,label:`Lateral e\u2032 ${lateral.toFixed(1)} cm/s`,detail:lateral<=7?'Reduced (<=7)':'Preserved (>7)'};
    return {value:null,label:'Mitral annular e\u2032',detail:'Not entered'};
  },

  _calculateGeneral(){
    const ePrime=this._ePrimeState();
    const ee=this._num('ddAverageEE');
    const ea=this._num('ddEA');
    const tr=this._num('ddTRV');
    const pasp=this._num('ddPASP');
    const lavi=this._num('ddLAVI');
    const lars=this._num('ddLARS');
    const pvsd=this._num('ddPVSD');
    const ivrt=this._num('ddIVRT');
    const dt=this._num('ddDT');

    const eeHigh=ee==null?null:ee>=14;
    const eaAbnormal=ea==null?null:(ea<=0.8 || ea>=2);
    const laviHigh=lavi==null?null:lavi>34;
    const larsLow=lars==null?null:lars<=18;
    const diagnosisMarkers=[eeHigh,eaAbnormal,laviHigh,larsLow].filter(v=>v!=null);
    const diagnosisPositive=diagnosisMarkers.filter(Boolean).length;
    let dysfunction='Insufficient data', dysfunctionTone='neutral';
    if(ePrime.value===true && diagnosisMarkers.length){
      dysfunction=diagnosisPositive>=1?'Present':'Not established';
      dysfunctionTone=diagnosisPositive>=1?'bad':'good';
    }else if(ePrime.value===false && diagnosisMarkers.length>=2){
      dysfunction=diagnosisPositive>=2?'Present':'Not supported';
      dysfunctionTone=diagnosisPositive>=2?'bad':'good';
    }

    let pressureState=null;
    if(tr!=null || pasp!=null) pressureState=(tr!=null && tr>=2.8) || (pasp!=null && pasp>=35);
    const core=[ePrime.value,eeHigh,pressureState].filter(v=>v!=null);
    const corePositive=core.filter(Boolean).length;
    const supportive=[larsLow,pvsd==null?null:pvsd<=0.67,laviHigh,ivrt==null?null:ivrt<=70].filter(v=>v!=null);
    const supportPositive=supportive.filter(Boolean).length;
    const supportNegative=supportive.length-supportPositive;

    let lap='Needs more data', lapTone='neutral';
    if(core.length===3 && corePositive===3){
      lap='Elevated'; lapTone='bad';
    }else if(ePrime.value===true && ea!=null && ea<=0.8 && corePositive===1){
      lap='Normal at rest'; lapTone='good';
    }else if((corePositive>=2 && supportPositive>=1) || (corePositive===1 && supportPositive>=2)){
      lap='Elevated'; lapTone='bad';
    }else if(core.length>=2 && corePositive<=1 && supportNegative>=2){
      lap='Normal at rest'; lapTone='good';
    }

    let grade='Not gradable', gradeTone='neutral';
    if(dysfunction==='Not supported' || dysfunction==='Not established'){
      grade='No definite dysfunction'; gradeTone='good';
    }else if(dysfunction==='Present' && lap==='Normal at rest'){
      grade='Grade I'; gradeTone='good';
    }else if(dysfunction==='Present' && lap==='Elevated' && ea!=null){
      grade=ea>=2?'Grade III':'Grade II'; gradeTone='bad';
    }else if(lap==='Elevated' && ea!=null){
      grade=ea>=2?'Grade III physiology':'Grade II physiology'; gradeTone='warn';
    }

    const markers=[
      this._marker(ePrime.label,ePrime.value,ePrime.detail,ePrime.detail),
      this._marker(`Average E/e\u2032${ee==null?'':` ${ee}`}`,eeHigh,'Elevated (>=14)','Not elevated (<14)'),
      this._marker(`E/A${ea==null?'':` ${ea}`}`,eaAbnormal,'Outside 0.8-2','Within 0.8-2'),
      this._marker(`TR-V / PASP${tr==null&&pasp==null?'':` ${tr!=null?tr+' m/s':''}${tr!=null&&pasp!=null?' / ':''}${pasp!=null?pasp+' mmHg':''}`}`,pressureState,'Elevated-pressure marker','Below pressure threshold'),
      this._marker(`LAVI${lavi==null?'':` ${lavi} mL/m2`}`,laviHigh,'Enlarged (>34)','Not enlarged (<=34)'),
      this._marker(`LARS${lars==null?'':` ${lars}%`}`,larsLow,'Reduced (<=18%)','Preserved (>18%)'),
      this._marker(`PV S/D${pvsd==null?'':` ${pvsd}`}`,pvsd==null?null:pvsd<=0.67,'Supports elevated LAP (<=0.67)','Does not meet strong support cutoff'),
      this._marker(`IVRT${ivrt==null?'':` ${ivrt} ms`}`,ivrt==null?null:ivrt<=70,'Short (<=70 ms)','Not shortened'),
      this._marker(`Deceleration time${dt==null?'':` ${dt} ms`}`,dt==null?null:(dt<160 || dt>220),dt!=null&&dt<160?'Restrictive support (<160 ms)':'Impaired-relaxation support (>220 ms)','Intermediate range')
    ];

    this._renderResult({
      headline:grade,
      summaries:[['Dysfunction',dysfunction,dysfunctionTone],['Mean LAP',lap,lapTone],['Grade',grade,gradeTone]],
      markers,
      interpretation:this._generalInterpretation(dysfunction,lap,grade,core,supportive),
      sourcePage:'Ch 8, pp. 73-82'
    });
  },

  _generalInterpretation(dysfunction,lap,grade,core,supportive){
    if(dysfunction==='Insufficient data') return 'Enter annular e\u2032 plus at least two functional or structural markers before diagnosing diastolic dysfunction.';
    if(lap==='Needs more data') return `Diastolic dysfunction assessment is ${dysfunction.toLowerCase()}, but the LAP triad is discordant or incomplete. Add LARS, pulmonary-vein S/D, LAVI or IVRT rather than forcing a grade.`;
    if(grade==='Grade I') return 'Impaired relaxation with normal estimated filling pressure at rest.';
    if(grade.startsWith('Grade II')) return 'Pseudonormal physiology with elevated estimated filling pressure. A normal-looking E/A does not mean normal diastolic function.';
    if(grade.startsWith('Grade III')) return 'Restrictive physiology with markedly elevated estimated filling pressure.';
    if(dysfunction==='Not supported' || dysfunction==='Not established') return 'The entered measurements do not establish LV diastolic dysfunction in the 2025 general pathway.';
    return `Available core markers: ${core.length}; secondary markers: ${supportive.length}. Interpret the result with rhythm, loading and valve disease.`;
  },

  _calculateAF(){
    const e=this._num('ddMitralE');
    const ee=this._num('ddAFSeptalEE');
    const tr=this._num('ddAFTRV');
    const pasp=this._num('ddAFPASP');
    const dt=this._num('ddAFDT');
    const pvsd=this._num('ddAFPVSD');
    const lars=this._num('ddAFLARS');
    const pressureLabel=(tr==null&&pasp==null)
      ? 'TR-V / PASP'
      : `TR-V / PASP ${tr!=null?tr+' m/s':''}${tr!=null&&pasp!=null?' / ':''}${pasp!=null?pasp+' mmHg':''}`;
    const pressurePositive=(tr==null&&pasp==null)
      ? null
      : ((tr!=null&&tr>2.8)||(pasp!=null&&pasp>35));
    const markers=[
      this._marker(`Mitral E${e==null?'':` ${e} cm/s`}`,e==null?null:e>=100,'High (>=100 cm/s)','Below 100 cm/s'),
      this._marker(`Septal E/e\u2032${ee==null?'':` ${ee}`}`,ee==null?null:ee>11,'Elevated (>11)','Not elevated'),
      this._marker(pressureLabel,pressurePositive,'Pressure marker positive','Below threshold'),
      this._marker(`DT${dt==null?'':` ${dt} ms`}`,dt==null?null:dt<=160,'Short (<=160 ms)','Not shortened'),
      this._marker(`PV S/D${pvsd==null?'':` ${pvsd}`}`,pvsd==null?null:pvsd<1,'Reduced (<1)','Not reduced'),
      this._marker(`LARS${lars==null?'':` ${lars}%`}`,lars==null?null:lars<18,'Reduced (<18%)','Preserved')
    ];
    const available=markers.filter(m=>m.value!=null);
    const positive=available.filter(m=>m.value).length;
    let lap='Insufficient data', tone='neutral';
    if(available.length>=3){
      if(positive>available.length/2){lap='Pattern favors elevated LAP';tone='bad';}
      else if(positive<available.length/2){lap='Pattern favors normal LAP';tone='good';}
      else {lap='Discordant pattern';tone='warn';}
    }
    this._renderResult({
      headline:lap,
      summaries:[['Rhythm','Atrial fibrillation','neutral'],['Mean LAP',lap,tone],['Grade','Not assigned in AF','neutral']],
      markers,
      interpretation:`${positive} of ${available.length} entered AF markers support elevated LAP. This is a transparent multiparametric synthesis, not a validated counting score; average representative beats with similar RR intervals.`,
      sourcePage:'Ch 8, pp. 77, 81-82'
    });
  },

  _calculateMAC(){
    const ea=this._num('ddMACEA');
    const ivrt=this._num('ddMACIVRT');
    let lap='Insufficient data', tone='neutral', detail='Enter E/A first.';
    if(ea!=null && ea<0.8){ lap='Usually normal LAP'; tone='good'; detail='E/A <0.8 in the moderate/severe MAC pathway.'; }
    else if(ea!=null && ea>1.8){ lap='Elevated LAP'; tone='bad'; detail='E/A >1.8 in the moderate/severe MAC pathway.'; }
    else if(ea!=null && ea>=0.8 && ea<=1.8){
      if(ivrt==null){ detail='E/A is 0.8-1.8; enter IVRT to adjudicate.'; }
      else if(ivrt<80){ lap='Elevated LAP'; tone='bad'; detail='Intermediate E/A with IVRT <80 ms.'; }
      else { lap='Usually normal LAP'; tone='good'; detail='Intermediate E/A with IVRT >=80 ms.'; }
    }
    const markers=[
      this._marker(`E/A${ea==null?'':` ${ea}`}`,ea==null?null:(ea>1.8),ea!=null&&ea>1.8?'Above 1.8':'Not above 1.8',ea!=null&&ea<0.8?'Below 0.8':'Intermediate 0.8-1.8'),
      this._marker(`IVRT${ivrt==null?'':` ${ivrt} ms`}`,ivrt==null?null:ivrt<80,'Short (<80 ms)','Longer (>=80 ms)')
    ];
    this._renderResult({
      headline:lap,
      summaries:[['Population','Moderate/severe MAC','neutral'],['Mean LAP',lap,tone],['Grade','Not assigned by this pathway','neutral']],
      markers,
      interpretation:detail+' Annular e\u2032 and E/e\u2032 are not used because MAC distorts them.',
      sourcePage:'Ch 8, pp. 77, 81-82'
    });
  },

  _renderResult({headline,summaries,markers,interpretation}){
    const result=this._el('ddResult');
    if(!result) return;
    const entered=markers.filter(m=>m.value!=null);
    result.innerHTML=`
      <div class="ct-result-head"><span class="eyebrow">Calculated interpretation</span><h4>${this._esc(headline)}</h4></div>
      <div class="ct-summary-grid">${summaries.map(([label,value,tone])=>`<div><span>${this._esc(label)}</span><strong class="ct-tone-${tone}">${this._esc(value)}</strong></div>`).join('')}</div>
      <p class="ct-interpretation">${this._esc(interpretation)}</p>
      ${entered.length?`<div class="ct-marker-list">${entered.map(m=>`<div class="ct-marker ${this._state(m.value)}"><i></i><span><strong>${this._esc(m.name)}</strong><small>${this._esc(m.text)}</small></span></div>`).join('')}</div>`:''}`;
  },

  renderReference(){
    const select=this._el('clinicalValueSet');
    const target=this._el('clinicalValueBody');
    if(!select || !target) return;
    const set=CLINICAL_VALUE_SETS.find(s=>s.id===select.value) || CLINICAL_VALUE_SETS[0];
    target.innerHTML=`
      <div class="ct-reference-head"><h4>${this._esc(set.title)}</h4></div>
      <div class="ct-value-table">${set.rows.map(([label,value,note])=>`<div class="ct-value-row"><div>${this._esc(label)}</div><strong>${this._esc(value)}</strong><small>${this._esc(note||'')}</small></div>`).join('')}</div>`;
  }
};
