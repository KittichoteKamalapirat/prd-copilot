import { PrdFormData } from '@/lib/schemas/prdSchemas'

export const generateFakeChunks = (input: PrdFormData): string[] => {
  const {
    hasObjective,
    hasSuccessMetrics,
    hasPOC,
    hasSecurity,
    hasFunctionalReq,
    hasNonFunctionalReq,
    hasStakeholders,
    hasBackground,
    hasConstraints,
    hasAssumptions,
    hasTimeline,
    hasDependency,
  } = input

  const dynamicChunks: string[] = [
    '#', // heading marker
    ' Product',
    ' Requirement',
    ' Document',
    '\n',
    '\n',
    ...(hasBackground ? backgroundChunks : []),
    ...(hasObjective ? objectiveChunks : []),
    ...(hasStakeholders ? stakeholdersChunks : []),
    ...(hasAssumptions ? assumptionsChunks : []),
    ...(hasConstraints ? constraintsChunks : []),
    ...(hasFunctionalReq ? functionalReqChunks : []),
    ...(hasNonFunctionalReq ? nonFunctionalReqChunks : []),
    ...(hasDependency ? dependencyChunks : []),
    ...(hasSecurity ? securityChunks : []),
    ...(hasTimeline ? timelineChunks : []),
    ...(hasSuccessMetrics ? successMetricsChunk : []),
    ...(hasPOC ? pocChunks : []),
  ]

  return dynamicChunks
}

export const overviewChunk = [
  '##', // subheading marker
  ' Overview',
  '\n',
  'PRD', // start of line after newline, no leading space
  ' Copilot',
  ' is',
  ' an',
  ' advanced',
  ' Software',
  ' as',
  ' a',
  ' Service',
  ' (SaaS)',
  ' platform',
  ' designed',
  ' to',
  ' streamline',
  ' and',
  ' simplify',
  ' the',
  ' creation',
  ' of',
  ' product',
  ' requirements',
  ' using',
  ' cutting-edge',
  ' Artificial',
  ' Intelligence.',
  ' It',
  ' enables',
  ' users',
  ' to',
  ' efficiently',
  ' fill',
  ' out',
  ' a',
  ' dynamic',
  ' form',
  ' customized',
  ' to',
  ' their',
  ' specific',
  ' project',
  ' needs,',
  ' resulting',
  ' in',
  ' the',
  ' generation',
  ' of',
  ' detailed',
  ' and',
  ' actionable',
  ' product',
  ' requirement',
  ' documents.',
  ' This',
  ' platform',
  ' is',
  ' intended',
  ' to',
  ' save',
  ' time,',
  ' enhance',
  ' clarity,',
  ' and',
  ' foster',
  ' improved',
  ' collaboration',
  ' among',
  ' product',
  ' teams.',
  '\n',
  '\n',
]

export const objectivesChunk = [
  '##',
  ' Objectives',
  '\n',
  '-', // start of line after newline
  ' Automate',
  ' the',
  ' process',
  ' of',
  ' creating',
  ' product',
  ' requirement',
  ' documents',
  ' using',
  ' AI.',
  '\n',
  '-',
  ' Provide',
  ' tailored',
  ' forms',
  ' catering',
  ' to',
  ' different',
  ' project',
  ' requirements',
  ' to',
  ' ensure',
  ' comprehensive',
  ' documentation.',
  '\n',
  '-',
  ' Enhance',
  ' productivity',
  ' by',
  ' reducing',
  ' the',
  ' time',
  ' and',
  ' effort',
  ' involved',
  ' in',
  ' drafting',
  ' PRDs',
  ' manually.',
  '\n',
  '-',
  ' Facilitate',
  ' improved',
  ' communication',
  ' and',
  ' collaboration',
  ' within',
  ' product',
  ' development',
  ' teams.',
  '\n',
  '\n',
]

export const audienceChunk = [
  '##',
  ' Target',
  ' Audience',
  '\n',
  '-',
  ' Product',
  ' Managers',
  '\n',
  '-',
  ' Project',
  ' Managers',
  '\n',
  '-',
  ' Software',
  ' Developers',
  '\n',
  '-',
  ' UX/UI',
  ' Designers',
  '\n',
  '-',
  ' Stakeholders',
  ' in',
  ' product',
  ' development',
  ' teams',
  '\n',
  '\n',
]

export const keyFeaturesChunk = [
  '##',
  ' Key',
  ' Features',
  '\n',
  'Though', // start of line, no leading space
  ' currently',
  ' not',
  ' specified,',
  ' the',
  ' platform’s',
  ' core',
  ' offering',
  ' revolves',
  ' around',
  ' the',
  ' AI-driven',
  ' generation',
  ' of',
  ' PRDs.',
  ' Future',
  ' iterations',
  ' may',
  ' include',
  ' features',
  ' such',
  ' as:',
  '\n',
  '-',
  ' Customizable',
  ' form',
  ' templates',
  ' for',
  ' different',
  ' types',
  ' of',
  ' projects.',
  '\n',
  '-',
  ' AI',
  ' suggestions',
  ' for',
  ' filling',
  ' out',
  ' forms',
  ' based',
  ' on',
  ' past',
  ' data',
  ' and',
  ' standard',
  ' best',
  ' practices.',
  '\n',
  '-',
  ' Collaborative',
  ' tools',
  ' allowing',
  ' team',
  ' members',
  ' to',
  ' contribute',
  ' to',
  ' and',
  ' review',
  ' PRDs.',
  '\n',
  '-',
  ' Integration',
  ' with',
  ' popular',
  ' project',
  ' management',
  ' tools',
  ' like',
  ' Jira,',
  ' Trello,',
  ' and',
  ' Asana.',
  '\n',
  '-',
  ' Version',
  ' control',
  ' to',
  ' track',
  ' changes',
  ' and',
  ' ensure',
  ' document',
  ' integrity.',
  '\n',
  '-',
  ' Export',
  ' options',
  ' in',
  ' various',
  ' formats',
  ' (PDF,',
  ' DOCX,',
  ' etc.)',
  ' for',
  ' ease',
  ' of',
  ' distribution.',
  '\n',
  '\n',
]

export const userFeedbackChunk = [
  '##',
  ' User',
  ' Feedback',
  '\n',
  'To',
  ' capture',
  ' user',
  ' feedback',
  ' and',
  ' continue',
  ' improving',
  ' the',
  ' platform,',
  ' consider',
  ' implementing:',
  '\n',
  '-',
  ' In-platform',
  ' surveys',
  ' to',
  ' assess',
  ' user',
  ' satisfaction',
  ' and',
  ' gather',
  ' suggestions.',
  '\n',
  '-',
  ' A',
  ' feedback',
  ' button',
  ' on',
  ' every',
  ' page',
  ' for',
  ' users',
  ' to',
  ' report',
  ' issues',
  ' or',
  ' propose',
  ' features.',
  '\n',
  '-',
  ' Analytics',
  ' to',
  ' monitor',
  ' usage',
  ' patterns',
  ' and',
  ' identify',
  ' common',
  ' pain',
  ' points',
  ' or',
  ' features',
  ' that',
  ' drive',
  ' engagement.',
  '\n',
  '\n',
]

export const roadmapChunk = [
  '##',
  ' Roadmap',
  '\n',
  'While',
  ' specific',
  ' dates',
  " aren't",
  ' indicated,',
  ' here',
  ' is',
  ' a',
  ' tentative',
  ' roadmap',
  ' for',
  ' PRD',
  ' Copilot:',
  '\n',
  '1.',
  ' **Initial',
  ' Launch:**',
  '\n',
  '-',
  ' Deploy',
  ' the',
  ' primary',
  ' functionality',
  ' allowing',
  ' users',
  ' to',
  ' generate',
  ' product',
  ' requirement',
  ' documents',
  ' via',
  ' AI.',
  '\n',
  '2.',
  ' **Feature',
  ' Enhancements:**',
  '\n',
  '-',
  ' Introduce',
  ' customizable',
  ' templates.',
  '\n',
  '-',
  ' Implement',
  ' AI',
  ' suggestions',
  ' for',
  ' optimizing',
  ' document',
  ' content.',
  '\n',
  '3.',
  ' **Collaborative',
  ' Functionality:**',
  '\n',
  '-',
  ' Enable',
  ' real-time',
  ' collaboration',
  ' tools.',
  '\n',
  '-',
  ' Develop',
  ' plug-ins',
  ' or',
  ' integrations',
  ' for',
  ' popular',
  ' project',
  ' management',
  ' platforms.',
  '\n',
  '4.',
  ' **Feedback',
  ' and',
  ' Optimization:**',
  '\n',
  '-',
  ' Continuously',
  ' gather',
  ' user',
  ' feedback',
  ' and',
  ' optimize',
  ' AI',
  ' algorithms.',
  '\n',
  '-',
  ' Roll',
  ' out',
  ' minor',
  ' updates',
  ' and',
  ' fixes',
  ' based',
  ' on',
  ' user',
  ' feedback.',
  '\n',
  '5.',
  ' **Version',
  ' Control',
  ' &',
  ' Export',
  ' Options:**',
  '\n',
  '-',
  ' Integrate',
  ' version',
  ' control',
  ' systems.',
  '\n',
  '-',
  ' Provide',
  ' multiple',
  ' export',
  ' options',
  ' to',
  ' cater',
  ' to',
  ' diverse',
  ' user',
  ' needs.',
  '\n',
  '\n',
]

export const successMetricsChunk = [
  '##',
  ' Success',
  ' Metrics',
  '\n',
  'The',
  ' success',
  ' of',
  ' PRD',
  ' Copilot',
  ' will',
  ' be',
  ' measured',
  ' through',
  ' several',
  ' key',
  ' performance',
  ' indicators:',
  '\n',
  '-',
  ' User',
  ' Adoption',
  ' Rate:',
  ' The',
  ' rate',
  ' at',
  ' which',
  ' new',
  ' users',
  ' are',
  ' signing',
  ' up',
  ' and',
  ' using',
  ' the',
  ' platform.',
  '\n',
  '-',
  ' User',
  ' Retention',
  ' Rate:',
  ' The',
  ' frequency',
  ' with',
  ' which',
  ' existing',
  ' users',
  ' continue',
  ' to',
  ' use',
  ' the',
  ' platform.',
  '\n',
  '-',
  ' User',
  ' Satisfaction:',
  ' Collected',
  ' through',
  ' surveys',
  ' and',
  ' feedback',
  ' tools.',
  '\n',
  '-',
  ' Document',
  ' Generation',
  ' Times:',
  ' Reduction',
  ' in',
  ' time',
  ' taken',
  ' to',
  ' produce',
  ' comprehensive',
  ' PRDs.',
  '\n',
  '-',
  ' Increase',
  ' in',
  ' Collaboration',
  ' Metrics:',
  ' More',
  ' users',
  ' engaging',
  ' with',
  ' collaborative',
  ' features,',
  ' indicating',
  ' improved',
  ' team',
  ' interaction.',
  '\n',
  '\n',
]

export const conclusionChunk = [
  '##',
  ' Conclusion',
  '\n',
  'PRD',
  ' Copilot',
  ' stands',
  ' to',
  ' revolutionize',
  ' the',
  ' way',
  ' product',
  ' requirement',
  ' documents',
  ' are',
  ' created',
  ' by',
  ' tapping',
  ' into',
  ' the',
  ' power',
  ' of',
  ' AI.',
  ' With',
  ' features',
  ' aimed',
  ' at',
  ' reducing',
  ' effort',
  ' and',
  ' increasing',
  ' clarity',
  ' and',
  ' collaboration,',
  ' it',
  ' is',
  ' set',
  ' to',
  ' become',
  ' an',
  ' indispensable',
  ' tool',
  ' for',
  ' product',
  ' teams.',
  ' Future',
  ' updates',
  ' and',
  ' iterations',
  ' driven',
  ' by',
  ' user',
  ' feedback',
  ' will',
  ' ensure',
  ' it',
  ' continues',
  ' to',
  ' meet',
  ' the',
  ' ever-evolving',
  ' needs',
  ' of',
  ' product',
  ' development',
  ' professionals.',
  '\n',
]

export const securityChunks = [
  '##',
  ' Security',
  ' Requirements',
  '\n',
  '-',
  ' Implement',
  ' robust',
  ' authentication',
  ' and',
  ' authorization',
  ' mechanisms',
  ' ensuring',
  ' that',
  ' only',
  ' approved',
  ' users',
  ' can',
  ' access',
  ' and',
  ' modify',
  ' PRDs.',
  '\n',
  '-',
  ' Enforce',
  ' encryption',
  ' for',
  ' data',
  ' in',
  ' transit',
  ' and',
  ' at',
  ' rest',
  ' using',
  ' industry-standard',
  ' protocols',
  ' (e.g.,',
  ' HTTPS,',
  ' TLS).',
  '\n',
  '-',
  ' Conduct',
  ' regular',
  ' security',
  ' audits',
  ' and',
  ' penetration',
  ' tests',
  ' to',
  ' identify',
  ' and',
  ' address',
  ' potential',
  ' vulnerabilities.',
  '\n',
  '-',
  ' Integrate',
  ' secure',
  ' coding',
  ' practices',
  ' and',
  ' code',
  ' reviews',
  ' throughout',
  ' the',
  ' development',
  ' lifecycle.',
  '\n',
  '-',
  ' Maintain',
  ' compliance',
  ' with',
  ' relevant',
  ' data',
  ' protection',
  ' regulations',
  ' (e.g.,',
  ' GDPR,',
  ' CCPA)',
  ' to',
  ' safeguard',
  ' user',
  ' privacy.',
  '\n',
  '\n',
]

export const functionalReqChunks = [
  '##',
  ' Functional',
  ' Requirements',
  '\n',
  '-',
  ' The',
  ' system',
  ' shall',
  ' allow',
  ' users',
  ' to',
  ' log',
  ' in',
  ' and',
  ' log',
  ' out',
  ' securely',
  ' using',
  ' authenticated',
  ' credentials.',
  '\n',
  '-',
  ' The',
  ' system',
  ' shall',
  ' enable',
  ' users',
  ' to',
  ' create',
  ' and',
  ' complete',
  ' dynamic',
  ' product',
  ' requirement',
  ' forms',
  ' tailored',
  ' to',
  ' their',
  ' project’s',
  ' needs.',
  '\n',
  '-',
  ' The',
  ' system',
  ' shall',
  ' leverage',
  ' AI-driven',
  ' suggestions',
  ' to',
  ' guide',
  ' users',
  ' in',
  ' filling',
  ' out',
  ' the',
  ' form,',
  ' offering',
  ' context-specific',
  ' recommendations.',
  '\n',
  '-',
  ' The',
  ' system',
  ' shall',
  ' allow',
  ' users',
  ' to',
  ' edit,',
  ' review,',
  ' and',
  ' finalize',
  ' product',
  ' requirement',
  ' documents',
  ' before',
  ' generation.',
  '\n',
  '-',
  ' The',
  ' system',
  ' shall',
  ' generate',
  ' comprehensive',
  ' PRDs',
  ' in',
  ' various',
  ' exportable',
  ' formats',
  ' (e.g.,',
  ' PDF,',
  ' DOCX)',
  ' for',
  ' distribution.',
  '\n',
  '-',
  ' The',
  ' system',
  ' shall',
  ' provide',
  ' basic',
  ' version',
  ' control,',
  ' allowing',
  ' users',
  ' to',
  ' track',
  ' changes',
  ' and',
  ' maintain',
  ' document',
  ' history.',
  '\n',
  '-',
  ' The',
  ' system',
  ' shall',
  ' integrate',
  ' with',
  ' project',
  ' management',
  ' tools',
  ' (e.g.,',
  ' Jira,',
  ' Trello)',
  ' to',
  ' streamline',
  ' workflows.',
  '\n',
  '\n',
]

export const nonFunctionalReqChunks = [
  '##',
  ' Non-Functional',
  ' Requirements',
  '\n',
  '-',
  ' Performance:',
  ' The',
  ' system',
  ' shall',
  ' respond',
  ' to',
  ' user',
  ' inputs',
  ' and',
  ' generate',
  ' AI-driven',
  ' suggestions',
  ' within',
  ' a',
  ' few',
  ' seconds,',
  ' ensuring',
  ' a',
  ' smooth',
  ' user',
  ' experience.',
  '\n',
  '-',
  ' Scalability:',
  ' The',
  ' platform',
  ' shall',
  ' support',
  ' a',
  ' growing',
  ' number',
  ' of',
  ' concurrent',
  ' users',
  ' and',
  ' projects',
  ' without',
  ' compromising',
  ' performance.',
  '\n',
  '-',
  ' Availability:',
  ' The',
  ' system',
  ' shall',
  ' maintain',
  ' a',
  ' minimum',
  ' 99.9%',
  ' uptime',
  ' to',
  ' ensure',
  ' PRD',
  ' generation',
  ' is',
  ' always',
  ' accessible.',
  '\n',
  '-',
  ' Reliability:',
  ' The',
  ' system',
  ' shall',
  ' handle',
  ' faults',
  ' gracefully,',
  ' retrying',
  ' operations',
  ' or',
  ' alerting',
  ' administrators',
  ' in',
  ' the',
  ' event',
  ' of',
  ' errors.',
  '\n',
  '-',
  ' Usability:',
  ' The',
  ' user',
  ' interface',
  ' shall',
  ' be',
  ' intuitive',
  ' and',
  ' simple',
  ' to',
  ' navigate,',
  ' minimizing',
  ' the',
  ' learning',
  ' curve.',
  '\n',
  '-',
  ' Maintainability:',
  ' The',
  ' codebase',
  ' shall',
  ' follow',
  ' clean',
  ' coding',
  ' standards',
  ' and',
  ' modular',
  ' design',
  ' principles,',
  ' making',
  ' it',
  ' easier',
  ' to',
  ' update',
  ' and',
  ' improve.',
  '\n',
  '-',
  ' Portability:',
  ' The',
  ' platform',
  ' shall',
  ' be',
  ' deployable',
  ' on',
  ' common',
  ' cloud',
  ' platforms',
  ' and',
  ' adaptable',
  ' to',
  ' different',
  ' infrastructures.',
  '\n',
  '\n',
]

export const stakeholdersChunks = [
  '##',
  ' Stakeholders',
  '\n',
  '-',
  ' Executive',
  ' Leadership:',
  ' Provides',
  ' overall',
  ' vision',
  ' and',
  ' strategic',
  ' direction,',
  ' ensuring',
  ' that',
  ' the',
  ' product',
  ' aligns',
  ' with',
  ' business',
  ' goals.',
  '\n',
  '-',
  ' Product',
  ' Managers:',
  ' Define',
  ' requirements,',
  ' prioritize',
  ' features,',
  ' and',
  ' oversee',
  ' the',
  ' product’s',
  ' direction',
  ' and',
  ' roadmap.',
  '\n',
  '-',
  ' Engineering',
  ' Team:',
  ' Implements',
  ' the',
  ' product’s',
  ' features,',
  ' addresses',
  ' technical',
  ' challenges,',
  ' and',
  ' ensures',
  ' system',
  ' stability',
  ' and',
  ' scalability.',
  '\n',
  '-',
  ' UX/UI',
  ' Designers:',
  ' Craft',
  ' the',
  ' user',
  ' experience,',
  ' ensuring',
  ' that',
  ' interfaces',
  ' are',
  ' intuitive,',
  ' accessible,',
  ' and',
  ' visually',
  ' appealing.',
  '\n',
  '-',
  ' QA',
  ' Testers:',
  ' Validate',
  ' functionality,',
  ' performance,',
  ' and',
  ' usability,',
  ' ensuring',
  ' the',
  ' product',
  ' meets',
  ' quality',
  ' standards.',
  '\n',
  '-',
  ' Marketing',
  ' and',
  ' Sales:',
  ' Communicate',
  ' the',
  ' product’s',
  ' value',
  ' proposition,',
  ' driving',
  ' user',
  ' adoption',
  ' and',
  ' market',
  ' growth.',
  '\n',
  '-',
  ' End',
  ' Users:',
  ' Provide',
  ' feedback',
  ' and',
  ' input',
  ' that',
  ' guide',
  ' improvements',
  ' and',
  ' future',
  ' feature',
  ' development.',
  '\n',
  '\n',
]

export const backgroundChunks = [
  '##',
  ' Background',
  '\n',
  'This',
  ' is',
  ' a',
  ' demo',
  ' version',
  ' showcasing',
  ' example',
  ' product',
  ' requirement',
  ' documentation',
  ' data.',
  ' All',
  ' details',
  ' displayed',
  ' here',
  ' are',
  ' strictly',
  ' for',
  ' illustrative',
  ' purposes,',
  ' and',
  ' do',
  ' not',
  ' reflect',
  ' actual',
  ' project',
  ' information.',
  ' Once',
  ' logged',
  ' in',
  ' and',
  ' subscribed,',
  ' users',
  ' will',
  ' gain',
  ' access',
  ' to',
  ' genuine,',
  ' context-specific',
  ' data',
  ' aligned',
  ' with',
  ' their',
  ' real-world',
  ' projects.',
  ' This',
  ' approach',
  ' ensures',
  ' that',
  ' product',
  ' teams',
  ' can',
  ' work',
  ' more',
  ' efficiently,',
  ' maintain',
  ' consistency,',
  ' and',
  ' accelerate',
  ' their',
  ' development',
  ' cycles',
  ' through',
  ' dynamic,',
  ' AI-driven',
  ' PRD',
  ' creation.',
  '\n',
  '\n',
]

export const constraintsChunks = [
  '##',
  ' Constraints',
  '\n',
  '-',
  ' Technical:',
  ' The',
  ' solution',
  ' must',
  ' be',
  ' compatible',
  ' with',
  ' existing',
  ' infrastructure',
  ' and',
  ' frameworks',
  ' to',
  ' minimize',
  ' integration',
  ' complexity.',
  '\n',
  '-',
  ' Security:',
  ' The',
  ' platform',
  ' must',
  ' comply',
  ' with',
  ' data',
  ' protection',
  ' regulations',
  ' and',
  ' maintain',
  ' strict',
  ' access',
  ' controls.',
  '\n',
  '-',
  ' Performance:',
  ' Response',
  ' times',
  ' for',
  ' form',
  ' generation,',
  ' AI',
  ' suggestions,',
  ' and',
  ' PRD',
  ' export',
  ' must',
  ' remain',
  ' within',
  ' acceptable',
  ' limits.',
  '\n',
  '-',
  ' Budgetary:',
  ' Resource',
  ' allocation',
  ' for',
  ' AI',
  ' compute',
  ' and',
  ' storage',
  ' must',
  ' be',
  ' managed',
  ' within',
  ' cost',
  ' constraints.',
  '\n',
  '-',
  ' Time:',
  ' Initial',
  ' feature',
  ' delivery',
  ' must',
  ' occur',
  ' within',
  ' a',
  ' defined',
  ' timeframe,',
  ' influencing',
  ' scope',
  ' and',
  ' prioritization.',
  '\n',
  '\n',
]

export const assumptionsChunks = [
  '##',
  ' Assumptions',
  '\n',
  '-',
  ' Users',
  ' have',
  ' basic',
  ' technical',
  ' literacy,',
  ' making',
  ' it',
  ' easy',
  ' to',
  ' interact',
  ' with',
  ' an',
  ' online',
  ' form-based',
  ' platform.',
  '\n',
  '-',
  ' Data',
  ' protection',
  ' policies',
  ' are',
  ' understood',
  ' and',
  ' followed',
  ' by',
  ' both',
  ' internal',
  ' teams',
  ' and',
  ' end-users.',
  '\n',
  '-',
  ' The',
  ' AI',
  ' models',
  ' will',
  ' improve',
  ' over',
  ' time',
  ' as',
  ' they',
  ' are',
  ' exposed',
  ' to',
  ' more',
  ' data',
  ' and',
  ' user',
  ' feedback.',
  '\n',
  '-',
  ' Infrastructure',
  ' and',
  ' hosting',
  ' environments',
  ' will',
  ' provide',
  ' sufficient',
  ' computational',
  ' resources',
  ' to',
  ' ensure',
  ' optimal',
  ' performance.',
  '\n',
  '-',
  ' Stakeholders',
  ' will',
  ' provide',
  ' timely',
  ' feedback',
  ' to',
  ' guide',
  ' product',
  ' enhancements.',
  '\n',
  '\n',
]

export const timelineChunks = [
  '##',
  ' Timeline',
  '\n',
  '-',
  ' Month',
  ' 1:',
  ' Project',
  ' setup,',
  ' initial',
  ' platform',
  ' architecture,',
  ' and',
  ' foundational',
  ' UI',
  ' components.',
  '\n',
  '-',
  ' Months',
  ' 2-3:',
  ' Implement',
  ' core',
  ' form',
  ' generation',
  ' functionality,',
  ' AI',
  ' suggestion',
  ' features,',
  ' and',
  ' basic',
  ' security',
  ' measures.',
  '\n',
  '-',
  ' Months',
  ' 4-5:',
  ' Introduce',
  ' export',
  ' formats,',
  ' integrate',
  ' with',
  ' project',
  ' management',
  ' tools,',
  ' and',
  ' refine',
  ' UI/UX.',
  '\n',
  '-',
  ' Month',
  ' 6:',
  ' Conduct',
  ' beta',
  ' testing,',
  ' gather',
  ' user',
  ' feedback,',
  ' and',
  ' implement',
  ' improvements',
  ' before',
  ' public',
  ' launch.',
  '\n',
  '-',
  ' Months',
  ' 7+:',
  ' Continuous',
  ' enhancements,',
  ' performance',
  ' optimizations,',
  ' and',
  ' feature',
  ' expansions',
  ' based',
  ' on',
  ' user',
  ' feedback',
  ' and',
  ' market',
  ' needs.',
  '\n',
  '\n',
]

export const dependencyChunks = [
  '##',
  ' Dependencies',
  '\n',
  '-',
  ' AI',
  ' Models:',
  ' Requires',
  ' ongoing',
  ' access',
  ' to',
  ' AI',
  ' frameworks',
  ' and',
  ' APIs',
  ' for',
  ' generating',
  ' intelligent',
  ' suggestions.',
  '\n',
  '-',
  ' Hosting',
  ' Infrastructure:',
  ' Relies',
  ' on',
  ' cloud-based',
  ' servers,',
  ' databases,',
  ' and',
  ' storage',
  ' solutions',
  ' for',
  ' uptime',
  ' and',
  ' scalability.',
  '\n',
  '-',
  ' Third-Party',
  ' Integrations:',
  ' Dependent',
  ' on',
  ' APIs',
  ' from',
  ' project',
  ' management',
  ' tools',
  ' (Jira,',
  ' Trello,',
  ' etc.)',
  ' to',
  ' enhance',
  ' functionality.',
  '\n',
  '-',
  ' Authentication',
  ' Services:',
  ' Leverages',
  ' secure',
  ' identity',
  ' and',
  ' access',
  ' management',
  ' providers',
  ' to',
  ' verify',
  ' user',
  ' credentials.',
  '\n',
  '-',
  ' Analytics',
  ' Tools:',
  ' Integrates',
  ' with',
  ' metrics',
  ' and',
  ' logging',
  ' solutions',
  ' to',
  ' monitor',
  ' usage,',
  ' performance,',
  ' and',
  ' user',
  ' engagement.',
  '\n',
  '\n',
]

export const objectiveChunks = [
  '##',
  ' Objectives',
  '\n',
  'The',
  ' following',
  ' objectives',
  ' are',
  ' represented',
  ' using',
  ' placeholder',
  ' data.',
  ' Actual',
  ' objectives',
  ' tailored',
  ' to',
  ' your',
  ' specific',
  ' product',
  ' and',
  ' organizational',
  ' needs',
  ' will',
  ' be',
  ' revealed',
  ' once',
  ' you',
  ' log',
  ' in',
  ' and',
  ' subscribe.',
  '\n',
  '-',
  ' Enable',
  ' product',
  ' managers',
  ' to',
  ' quickly',
  ' scaffold',
  ' and',
  ' generate',
  ' comprehensive',
  ' product',
  ' requirements',
  ' with',
  ' minimal',
  ' manual',
  ' effort.',
  '\n',
  '-',
  ' Reduce',
  ' time-to-market',
  ' by',
  ' streamlining',
  ' the',
  ' product',
  ' requirement',
  ' creation',
  ' process,',
  ' allowing',
  ' teams',
  ' to',
  ' focus',
  ' on',
  ' execution',
  ' rather',
  ' than',
  ' documentation.',
  '\n',
  '-',
  ' Improve',
  ' clarity',
  ' and',
  ' alignment',
  ' by',
  ' providing',
  ' AI-driven',
  ' suggestions',
  ' and',
  ' standardized',
  ' templates',
  ' that',
  ' ensure',
  ' all',
  ' essential',
  ' details',
  ' are',
  ' captured.',
  '\n',
  '-',
  ' Foster',
  ' better',
  ' collaboration',
  ' across',
  ' cross-functional',
  ' teams',
  ' by',
  ' making',
  ' PRD',
  ' creation',
  ' more',
  ' transparent',
  ' and',
  ' accessible.',
  '\n',
  '\n',
]

export const pocChunks = [
  '##',
  ' Proof',
  ' of',
  ' Concept',
  ' (MVP)',
  '\n',
  '-',
  ' Basic',
  ' form',
  ' generation:',
  ' Allow',
  ' users',
  ' to',
  ' input',
  ' fundamental',
  ' project',
  ' details',
  ' and',
  ' generate',
  ' a',
  ' simple',
  ' PRD.',
  '\n',
  '-',
  ' Limited',
  ' AI',
  ' suggestions:',
  ' Provide',
  ' a',
  ' minimal',
  ' set',
  ' of',
  ' smart',
  ' prompts',
  ' to',
  ' guide',
  ' users',
  ' through',
  ' the',
  ' form.',
  '\n',
  '-',
  ' Basic',
  ' export',
  ' functionality:',
  ' Offer',
  ' a',
  ' single',
  ' export',
  ' format',
  ' (e.g.,',
  ' PDF)',
  ' to',
  ' validate',
  ' the',
  ' concept',
  ' and',
  ' gather',
  ' user',
  ' feedback.',
  '\n',
  '-',
  ' Simple',
  ' UI:',
  ' Focus',
  ' on',
  ' usability',
  ' rather',
  ' than',
  ' advanced',
  ' UI/UX',
  ' elements',
  ' to',
  ' prove',
  ' core',
  ' functionality.',
  '\n',
  '\n',
]
