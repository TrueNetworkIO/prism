import {
  // Identity & Personal
  User, AtSign, Phone, Home, ContactRound,

  // Education & Professional
  GraduationCap, Briefcase, Medal, BookText,

  // Financial & Economic
  DollarSign, Landmark, Receipt, Umbrella, BanknoteIcon,
  Coins, CircleDollarSign, CircleEllipsis,

  // Reputation & Trust
  Star, ThumbsUp, CheckCircle2, ClipboardCheck, BadgeCheck, BadgePlus,

  // Health & Medical
  Heart, Syringe, Stethoscope, Activity, Pill, HeartPulse,

  // Gaming & Digital
  Gamepad2, Trophy, Package, KeyboardIcon, Sparkles, Award,

  // Location & Travel
  Home as HomeIcon, Plane, Stamp, Map, Car,

  // Environmental & Impact
  Leaf, Sprout, Zap, Recycle, Trees,

  // Governance & Participation
  Vote, Users, UserCog, GitFork,

  // Security & Access
  Shield, Key, Lock, UserCheck, KeyRound, ShieldCheck,


  // Intellectual Property
  Copyright, FileKey, BookOpen, PenTool, FileSignature,
  FileType,

  // Community & Social Impact
  HeartHandshake, Lightbulb, UsersRound, HandHeart, HelpingHand, Megaphone,

  // DeFi & Web3
  Wallet, Layers, LandPlot, Network, LayoutGrid, Fingerprint,

  // Behavioral & Analytics
  BarChart2, SlidersHorizontal, History, LineChart, TrendingUp,
  MousePointerClick, TimerIcon,

  // Time & Date
  Clock, Calendar, Timer, Hourglass, AlarmClock,

  // Content & Media
  Image, Video, Music, FileText,
  Headphones, CirclePlay,

  // Geographic & Location
  MapPin, Globe, Building2, Route, MapIcon, Navigation,

  // Development & Tech
  Code, Database, Server, GitBranch, Bug,
  Webhook, Settings, Boxes,

  // Messaging & Communication
  MessageCircle, MessageSquare, Mail, MessageSquareDot,


  // Files & Storage
  File, FolderOpen, Archive, HardDrive, Cloud,
  // Actions & Events
  Play, AlertCircle, AlertTriangle, Bell, ClipboardList, CheckSquare,
  Loader2, Save,

  Shirt, Smartphone, Tv,



  IdCard
} from 'lucide-react'

import TrueSVG from '../../public/file.svg'

interface IconMap {
  [key: string]: React.ComponentType<any>
}

interface KeywordMatch {
  type: string;
  keyword: string;
  score: number;
}

const patterns = {
  // Devices
  keyboard: ['keyboard', 'input', 'key', 'press', 'character', 'type'],

  // Identity & Personal Info
  user: ['user', 'name', 'person', 'profile', 'account', 'identity', 'author', 'owner', 'holder', 'individual', 'member'],
  biometric: ['fingerprint', 'retina', 'facial', 'biometric', 'dna', 'signature', 'cid', 'unique', 'identifier'],
  credential: ['credential', 'license', 'permit', 'certificate', 'badge', 'qualification', 'approval', 'endorsement'],
  social: ['twitter', 'github', 'linkedin', 'discord', 'telegram', 'social', 'network', 'community', 'platform', 'media'],
  email: ['email', 'mail', 'contact', 'message', 'inbox', 'outbox'],
  phone: ['phone', 'mobile', 'telephone', 'contact', 'call', 'number', 'cellular'],
  address: ['address', 'physical', 'street', 'postal', 'location', 'place', 'residence'],
  identification: ['id', 'passport', 'card', 'license', 'identification', 'identity', 'badge', 'tag'],
  user_settings: ['settings', 'preferences', 'options', 'config', 'configuration', 'setup'],

  // Education & Professional
  education: ['degree', 'diploma', 'education', 'graduate', 'university', 'school', 'college', 'academic', 'learning', 'student', 'study', 'course'],
  employment: ['job', 'work', 'employer', 'position', 'career', 'occupation', 'employment', 'profession', 'business', 'workplace'],
  skill: ['skill', 'expertise', 'competency', 'proficiency', 'knowledge', 'capability', 'talent', 'ability', 'experience'],
  certification: ['certification', 'accreditation', 'qualification', 'training', 'endorsement', 'merit', 'achievement'],
  organization: ['organization', 'company', 'enterprise', 'corporation', 'firm', 'institution', 'establishment'],
  book: ['book', 'read', 'publication', 'text', 'literature', 'novel', 'writing', 'document', 'essay'],

  // Financial & Economic
  income: ['income', 'salary', 'earnings', 'revenue', 'wage', 'pay', 'compensation', 'stipend', 'money'],
  bank: ['bank', 'financial', 'institution', 'account', 'savings'],
  investment: ['invest', 'portfolio', 'stock', 'share', 'fund', 'asset', 'security', 'bond', 'market', 'equity'],
  creditScore: ['credit', 'fico', 'score', 'rating', 'creditworthiness', 'assessment', 'evaluation'],
  asset: ['asset', 'property', 'ownership', 'holding', 'possession', 'wealth', 'item', 'resource'],
  transaction: ['transaction', 'payment', 'transfer', 'exchange', 'purchase', 'sell', 'buy', 'sale', 'deal', 'trade'],
  collateral: ['collateral', 'security', 'guarantee', 'backing', 'pledge', 'deposit', 'assurance'],
  insurance: ['insurance', 'coverage', 'policy', 'protection', 'assurance', 'indemnity', 'security', 'safeguard'],
  currency: ['currency', 'money', 'cash', 'coin', 'dollar', 'euro', 'yen', 'pound', 'crypto', 'token', 'monetary'],
  price: ['price', 'cost', 'fee', 'charge', 'rate', 'amount', 'value', 'worth'],

  // Reputation & Trust
  reputation: ['reputation', 'standing', 'credibility', 'trust', 'reliability', 'xp', 'points', 'score', 'karma', 'rank', 'level', 'prestige'],
  review: ['review', 'rating', 'feedback', 'assessment', 'evaluation', 'appraisal', 'judgment', 'opinion', 'comment', 'testimonial'],
  verification: ['verify', 'validate', 'confirm', 'authenticate', 'prove', 'check', 'certify', 'substantiate', 'demonstrate'],
  compliance: ['compliance', 'regulatory', 'legal', 'standard', 'requirement', 'rule', 'regulation', 'law', 'guideline', 'protocol'],
  trust: ['trust', 'confidence', 'faith', 'belief', 'reliance', 'assurance', 'dependability', 'reliability'],
  endorsement: ['endorsement', 'approval', 'support', 'backing', 'recommendation', 'advocacy', 'sponsorship'],

  // Health & Medical
  health: ['health', 'medical', 'clinical', 'condition', 'diagnosis', 'wellness', 'wellbeing', 'healthcare', 'treatment'],
  vaccination: ['vaccine', 'immunization', 'shot', 'booster', 'inoculation', 'jab', 'prevention'],
  test: ['test', 'screening', 'examination', 'assessment', 'result', 'check', 'analysis', 'evaluation', 'diagnostic'],
  fitness: ['fitness', 'exercise', 'workout', 'activity', 'training', 'gym', 'strength', 'conditioning', 'health'],
  medication: ['medicine', 'drug', 'prescription', 'pharmaceutical', 'tablet', 'pill', 'capsule', 'remedy', 'treatment'],
  vital: ['vital', 'sign', 'pulse', 'heartbeat', 'blood', 'pressure', 'temperature', 'rate', 'oxygen'],

  // Gaming & Digital
  game: ['game', 'play', 'match', 'round', 'session', 'competition', 'contest', 'tournament', 'sport', 'activity', 'entertainment'],
  gameStats: ['stats', 'statistics', 'performance', 'metrics', 'analytics', 'figures', 'numbers', 'data', 'records', 'scores'],
  achievement: ['achievement', 'accomplishment', 'milestone', 'trophy', 'award', 'success', 'victory', 'conquest', 'triumph'],
  inventory: ['inventory', 'collection', 'items', 'assets', 'belongings', 'possessions', 'goods', 'equipment', 'supplies', 'gear'],
  leaderboard: ['leaderboard', 'ranking', 'standing', 'position', 'placement', 'scoreboard', 'table', 'list', 'hierarchy'],
  level: ['level', 'rank', 'tier', 'grade', 'stage', 'phase', 'step', 'degree', 'class', 'category'],

  // Location & Travel
  residence: ['residence', 'home', 'dwelling', 'address', 'domicile', 'abode', 'house', 'apartment', 'accommodation'],
  citizenship: ['citizen', 'nationality', 'residency', 'passport', 'migration', 'immigration', 'status', 'country', 'resident'],
  travel: ['travel', 'journey', 'trip', 'visit', 'destination', 'tour', 'excursion', 'voyage', 'expedition', 'adventure'],
  visa: ['visa', 'permit', 'authorization', 'entry', 'approval', 'documentation', 'papers', 'clearance'],
  transportation: ['transport', 'vehicle', 'car', 'bike', 'bicycle', 'bus', 'train', 'plane', 'ship', 'boat', 'transit'],
  distance: ['distance', 'route', 'path', 'way', 'direction', 'miles', 'kilometers', 'proximity', 'location'],

  // Environmental & Impact
  carbon: ['carbon', 'emission', 'footprint', 'environmental', 'climate', 'pollution', 'co2', 'greenhouse', 'gas'],
  sustainability: ['sustainable', 'green', 'eco', 'environmental', 'renewable', 'conservation', 'preservation', 'ecology'],
  energy: ['energy', 'power', 'consumption', 'usage', 'utility', 'electricity', 'gas', 'oil', 'fuel', 'resource'],
  recycling: ['recycle', 'waste', 'disposal', 'reuse', 'reduce', 'compost', 'biodegradable', 'sustainable'],
  weather: ['weather', 'climate', 'temperature', 'humidity', 'pressure', 'precipitation', 'forecast', 'season', 'meteorology'],
  nature: ['nature', 'environment', 'ecosystem', 'biodiversity', 'habitat', 'wildlife', 'forest', 'ocean', 'mountain'],

  // Governance & Participation
  vote: ['vote', 'ballot', 'election', 'poll', 'decision', 'referendum', 'choice', 'opinion', 'preference', 'selection'],
  membership: ['member', 'subscription', 'affiliation', 'belonging', 'association', 'club', 'group', 'community', 'organization'],
  role: ['role', 'position', 'responsibility', 'duty', 'function', 'task', 'job', 'assignment', 'charge', 'office'],
  delegation: ['delegate', 'represent', 'proxy', 'authority', 'agent', 'deputy', 'representative', 'spokesperson'],
  policy: ['policy', 'guideline', 'rule', 'regulation', 'standard', 'protocol', 'procedure', 'directive', 'law'],
  decision: ['decision', 'choice', 'selection', 'determination', 'judgment', 'verdict', 'resolution', 'conclusion'],

  // Security & Access
  clearance: ['clearance', 'access', 'permission', 'authorization', 'approval', 'privilege', 'right', 'grant', 'entitlement'],
  authentication: ['auth', 'authenticate', 'verify', 'validate', 'confirm', 'check', 'identify', 'recognize', 'login', 'signin'],
  permission: ['permission', 'right', 'privilege', 'allowance', 'authorization', 'consent', 'approval', 'sanction'],
  kyc: ['kyc', 'know', 'customer', 'identity', 'verification', 'identification', 'validation', 'check', 'proof'],
  password: ['password', 'passcode', 'pin', 'secret', 'key', 'login', 'credential', 'authentication', 'security'],
  encryption: ['encryption', 'cryptography', 'cipher', 'code', 'scramble', 'protect', 'secure', 'encode', 'hash'],

  // Intellectual Property
  copyright: ['copyright', 'intellectual', 'property', 'rights', 'ownership', 'legal', 'protection', 'attribution'],
  license: ['license', 'patent', 'trademark', 'agreement', 'contract', 'permission', 'authorization', 'right'],
  ownership: ['owner', 'rights', 'title', 'deed', 'possession', 'property', 'belonging', 'asset', 'holding'],
  creation: ['create', 'author', 'artist', 'maker', 'producer', 'inventor', 'designer', 'creator', 'developer', 'builder'],
  patent: ['patent', 'intellectual', 'property', 'invention', 'innovation', 'design', 'utility', 'exclusive', 'right'],
  originality: ['original', 'unique', 'novel', 'creative', 'innovative', 'authentic', 'genuine', 'new', 'fresh'],

  // Community & Social Impact
  contribution: ['contribute', 'donation', 'support', 'help', 'assist', 'aid', 'give', 'provision', 'offering', 'gift'],
  impact: ['impact', 'influence', 'effect', 'change', 'result', 'outcome', 'consequence', 'difference', 'significance'],
  participation: ['participate', 'involve', 'engage', 'join', 'collaborate', 'cooperate', 'interact', 'contribute'],
  volunteer: ['volunteer', 'service', 'help', 'assist', 'aid', 'support', 'charity', 'community', 'humanitarian'],
  collaboration: ['collaborate', 'cooperate', 'work', 'partner', 'team', 'joint', 'collective', 'together', 'alliance'],
  assistance: ['assistance', 'help', 'aid', 'support', 'relief', 'backup', 'service', 'guidance', 'care', 'rescue'],

  // DeFi & Web3
  wallet: ['wallet', 'address', 'account', 'holder', 'container', 'storage', 'keepkey', 'ledger', 'trezor'],
  stake: ['stake', 'deposit', 'lock', 'commit', 'bond', 'pledge', 'allocate', 'delegate', 'dedicate'],
  governance: ['governance', 'dao', 'proposal', 'vote', 'decision', 'management', 'administration', 'ruling', 'control'],
  protocol: ['protocol', 'platform', 'system', 'network', 'infrastructure', 'framework', 'standard', 'procedure', 'method'],
  token: ['token', 'coin', 'cryptocurrency', 'crypto', 'asset', 'currency', 'money', 'unit', 'value', 'digital'],
  blockchain: ['blockchain', 'ledger', 'distributed', 'decentralized', 'crypto', 'chain', 'block', 'node', 'consensus'],

  // Behavioral & Analytics
  behavior: ['behavior', 'pattern', 'habit', 'activity', 'tendency', 'practice', 'trait', 'demeanor', 'characteristic'],
  interaction: ['interact', 'engage', 'participate', 'use', 'utilize', 'handle', 'operate', 'employ', 'access'],
  preference: ['prefer', 'choice', 'option', 'selection', 'favorite', 'desire', 'like', 'want', 'wish', 'inclination'],
  history: ['history', 'record', 'log', 'track', 'chronicle', 'account', 'documentation', 'journal', 'past', 'archive'],
  analytics: ['analytics', 'data', 'statistics', 'metrics', 'analysis', 'insight', 'report', 'measure', 'evaluation'],
  pattern: ['pattern', 'trend', 'regularity', 'recurrence', 'repetition', 'sequence', 'arrangement', 'order', 'structure'],

  // Time & Date
  time: ['time', 'duration', 'period', 'timestamp', 'date', 'when', 'moment', 'instant', 'clock', 'hour', 'minute', 'second'],
  calendar: ['schedule', 'calendar', 'date', 'appointment', 'event', 'meeting', 'agenda', 'planner', 'itinerary'],
  age: ['age', 'years', 'birthday', 'dob', 'birth', 'born', 'generation', 'era', 'period', 'span'],
  deadline: ['deadline', 'due', 'expiry', 'expiration', 'until', 'limit', 'cutoff', 'term', 'timeframe', 'window'],
  duration: ['duration', 'length', 'period', 'stretch', 'span', 'interval', 'time', 'extent', 'range', 'continuance'],
  frequency: ['frequency', 'rate', 'pace', 'tempo', 'rhythm', 'recurrence', 'periodicity', 'regularity', 'repetition'],

  // Content & Media
  image: ['image', 'photo', 'picture', 'avatar', 'thumbnail', 'graphic', 'illustration', 'visual', 'snapshot', 'capture'],
  video: ['video', 'movie', 'film', 'clip', 'stream', 'footage', 'recording', 'reel', 'playback', 'cinema'],
  audio: ['audio', 'sound', 'music', 'voice', 'recording', 'song', 'track', 'note', 'tune', 'melody'],
  document: ['document', 'file', 'paper', 'record', 'certificate', 'form', 'page', 'sheet', 'report', 'text'],
  media: ['media', 'content', 'material', 'resource', 'asset', 'information', 'data', 'file', 'item', 'element'],
  format: ['format', 'mime', 'type', 'structure', 'layout', 'arrangement', 'style', 'design', 'template', 'pattern'],

  // Geographic & Location
  location: ['location', 'position', 'coordinate', 'place', 'spot', 'site', 'point', 'area', 'region', 'zone'],
  country: ['country', 'nation', 'region', 'territory', 'state', 'province', 'land', 'domain', 'realm', 'kingdom'],
  city: ['city', 'town', 'municipality', 'district', 'locality', 'settlement', 'community', 'metropolis', 'village'],
  route: ['route', 'path', 'direction', 'way', 'track', 'course', 'road', 'street', 'avenue', 'lane', 'boulevard'],
  map: ['map', 'chart', 'plot', 'plan', 'guide', 'layout', 'diagram', 'sketch', 'blueprint', 'atlas'],
  coordinate: ['coordinate', 'position', 'point', 'location', 'latitude', 'longitude', 'gps', 'grid', 'reference'],

  // Development & Tech
  code: ['code', 'program', 'script', 'software', 'development', 'application', 'app', 'algorithm', 'function', 'routine'],
  database: ['database', 'storage', 'repository', 'collection', 'archive', 'record', 'information', 'data', 'memory'],
  server: ['server', 'host', 'system', 'computer', 'machine', 'device', 'hardware', 'equipment', 'apparatus'],
  api: ['api', 'interface', 'endpoint', 'service', 'connection', 'protocol', 'bridge', 'link', 'channel', 'communication'],
  version: ['version', 'release', 'edition', 'update', 'revision', 'modification', 'alteration', 'change', 'iteration'],
  bug: ['bug', 'error', 'issue', 'problem', 'fault', 'defect', 'flaw', 'glitch', 'malfunction', 'trouble'],

  // Messaging & Communication
  message: ['message', 'communication', 'text', 'note', 'memo', 'chat', 'correspondence', 'letter', 'mail', 'post'],
  notification: ['notification', 'alert', 'announcement', 'reminder', 'update', 'message', 'ping', 'notice', 'signal'],
  conversation: ['conversation', 'discussion', 'dialogue', 'chat', 'talk', 'discourse', 'exchange', 'interaction', 'communication'],
  contact: ['contact', 'connection', 'relation', 'link', 'associate', 'acquaintance', 'correspondent', 'friend', 'colleague'],
  feedback: ['feedback', 'response', 'reaction', 'reply', 'comment', 'opinion', 'view', 'perception', 'judgment'],
  announcement: ['announcement', 'notice', 'declaration', 'statement', 'proclamation', 'broadcast', 'publication', 'bulletin'],

  // Files & Storage
  file: ['file', 'document', 'record', 'data', 'information', 'content', 'material', 'paper', 'item', 'entry'],
  folder: ['folder', 'directory', 'collection', 'container', 'compartment', 'section', 'category', 'classification', 'group'],
  storage: ['storage', 'size', 'repository', 'archive', 'bank', 'deposit', 'hold', 'keep', 'maintain', 'preserve', 'retain'],
  backup: ['backup', 'copy', 'modified', 'edited', 'duplicate', 'clone', 'replica', 'reproduction', 'reserve', 'spare', 'substitute'],
  cloud: ['cloud', 'online', 'internet', 'web', 'network', 'virtual', 'remote', 'digital', 'electronic', 'cyber'],
  archive: ['archive', 'repository', 'collection', 'library', 'store', 'warehouse', 'inventory', 'stockpile', 'reserve'],

  // Actions & Events
  action: ['action', 'activity', 'operation', 'task', 'procedure', 'function', 'process', 'step', 'move', 'performance'],
  event: ['event', 'occurrence', 'happening', 'incident', 'episode', 'affair', 'occasion', 'ceremony', 'function', 'gathering'],
  alert: ['alert', 'warning', 'caution', 'notice', 'notification', 'alarm', 'signal', 'indication', 'sign', 'tip'],
  status: ['status', 'state', 'condition', 'situation', 'position', 'standing', 'rank', 'level', 'grade', 'class'],
  setting: ['setting', 'configuration', 'setup', 'arrangement', 'adjustment', 'modification', 'customization', 'preference'],
  progress: ['progress', 'development', 'advancement', 'improvement', 'growth', 'evolution', 'headway', 'gain', 'breakthrough'],

  // Products & Items
  product: ['product', 'item', 'merchandise', 'goods', 'commodity', 'article', 'object', 'thing', 'artifact', 'possession'],
  device: ['device', 'gadget', 'appliance', 'apparatus', 'instrument', 'implement', 'tool', 'equipment', 'machine', 'mechanism'],
  electronics: ['electronic', 'digital', 'electric', 'technological', 'technical', 'computerized', 'automated', 'high-tech'],
  accessory: ['accessory', 'attachment', 'add-on', 'extra', 'supplement', 'complement', 'addition', 'enhancement', 'extension'],
  clothing: ['clothing', 'apparel', 'attire', 'garment', 'outfit', 'costume', 'dress', 'wardrobe', 'fashion', 'wear'],
  furniture: ['furniture', 'fixture', 'fitting', 'furnishing', 'equipment', 'facility', 'amenity', 'accessory', 'appointment'],

  // Misc
  reference: ['reference', 'citation', 'source', 'origin', 'derivation', 'attribution', 'credit', 'acknowledgment', 'recognition'],
  category: ['category', 'classification', 'class', 'group', 'type', 'kind', 'sort', 'variety', 'genre', 'species'],
  label: ['label', 'tag', 'marker', 'indicator', 'sign', 'badge', 'symbol', 'emblem', 'token', 'identifier'],
  description: ['description', 'explanation', 'definition', 'account', 'portrayal', 'representation', 'depiction', 'illustration'],
  priority: ['priority', 'importance', 'precedence', 'significance', 'value', 'weight', 'rank', 'standing', 'status'],
  resource: ['resource', 'asset', 'means', 'supply', 'reserve', 'store', 'stock', 'provision', 'material', 'source'],

  // More True Network specific keywords
  onchain: ['onchain', 'chain', 'blockchain', 'ledger', 'immutable', 'transparent', 'decentralized', 'distributed'],
  attestation: ['attestation', 'attest', 'certify', 'statement', 'declaration', 'testimony', 'assertion', 'confirmation'],
  algorithm: ['algorithm', 'computation', 'formula', 'calculation', 'process', 'method', 'procedure', 'routine'],
  data: ['data', 'information', 'facts', 'statistics', 'figures', 'records', 'details', 'particulars', 'specifics'],
  schema: ['schema', 'structure', 'framework', 'outline', 'blueprint', 'plan', 'template', 'model', 'format'],
  compute: ['compute', 'calculate', 'process', 'analyze', 'evaluate', 'determine', 'solve', 'work', 'operate'],
  network: ['network', 'system', 'grid', 'web', 'mesh', 'framework', 'infrastructure', 'architecture', 'ecosystem'],
  issuer: ['issuer', 'provider', 'creator', 'source', 'origin', 'authority', 'entity', 'organization', 'agent'],
  wasm: ['wasm', 'assembly', 'module', 'bytecode', 'compiled', 'component', 'object', 'program', 'binary']
}

const iconMap: IconMap = {
  true: TrueSVG,

  // Devices
  keyboard: KeyboardIcon,

  // Identity & Personal
  user: User,
  biometric: Fingerprint,
  credential: BadgeCheck,
  social: AtSign,
  email: Mail,
  phone: Phone,
  address: Home,
  identification: IdCard,
  user_settings: UserCog,

  // Education & Professional
  education: GraduationCap,
  employment: Briefcase,
  skill: Award,
  certification: Medal,
  organization: Building2,
  book: BookOpen,

  // Financial & Economic
  income: DollarSign,
  bank: Landmark,
  investment: LineChart,
  creditScore: Star,
  asset: Package,
  transaction: Receipt,
  collateral: ShieldCheck,
  insurance: Umbrella,
  currency: CircleDollarSign,
  price: BanknoteIcon,

  // Reputation & Trust
  reputation: Star,
  review: ThumbsUp,
  verification: CheckCircle2,
  compliance: ClipboardCheck,
  trust: BadgeCheck,
  endorsement: BadgePlus,

  // Health & Medical
  health: Heart,
  vaccination: Syringe,
  test: Stethoscope,
  fitness: Activity,
  medication: Pill,
  vital: HeartPulse,

  // Gaming & Digital
  game: Gamepad2,
  gameStats: BarChart2,
  achievement: Trophy,
  inventory: Package,
  leaderboard: Trophy,
  level: Award,

  // Location & Travel
  residence: HomeIcon,
  citizenship: IdCard,
  travel: Plane,
  visa: Stamp,
  transportation: Car,
  distance: Map,

  // Environmental & Impact
  carbon: Leaf,
  sustainability: Sprout,
  energy: Zap,
  recycling: Recycle,
  weather: Cloud,
  nature: Trees,

  // Governance & Participation
  vote: Vote,
  membership: Users,
  role: UserCog,
  delegation: GitFork,
  policy: ClipboardList,
  decision: CheckSquare,

  // Security & Access
  clearance: Shield,
  authentication: Key,
  permission: Lock,
  kyc: UserCheck,
  password: KeyRound,
  encryption: FileKey,

  // Intellectual Property
  copyright: Copyright,
  license: FileSignature,
  ownership: BookOpen,
  creation: PenTool,
  originality: Sparkles,

  // Community & Social Impact
  contribution: HeartHandshake,
  impact: Lightbulb,
  participation: UsersRound,
  volunteer: HandHeart,
  collaboration: Users,
  assistance: HelpingHand,

  // DeFi & Web3
  wallet: Wallet,
  stake: Layers,
  governance: LandPlot,
  protocol: Network,
  token: Coins,
  blockchain: Database,

  // Behavioral & Analytics
  behavior: BarChart2,
  interaction: MousePointerClick,
  preference: SlidersHorizontal,
  history: History,
  analytics: LineChart,
  pattern: TrendingUp,

  // Time & Date
  time: Clock,
  calendar: Calendar,
  age: Timer,
  deadline: Hourglass,
  duration: TimerIcon,
  frequency: AlarmClock,

  // Content & Media
  image: Image,
  video: Video,
  audio: Music,
  document: FileText,
  media: CirclePlay,
  format: FileType,

  // Geographic & Location
  location: MapPin,
  country: Globe,
  city: Building2,
  route: Route,
  map: MapIcon,
  coordinate: Navigation,

  // Development & Tech
  code: Code,
  database: Database,
  server: Server,
  api: Webhook,
  version: GitBranch,
  bug: Bug,

  // Messaging & Communication
  message: MessageCircle,
  notification: Bell,
  conversation: MessageSquare,
  contact: ContactRound,
  feedback: MessageSquareDot,
  announcement: Megaphone,

  // Files & Storage
  file: File,
  folder: FolderOpen,
  storage: HardDrive,
  backup: Save,
  cloud: Cloud,
  archive: Archive,

  // Actions & Events
  action: Play,
  event: Calendar,
  alert: AlertCircle,
  status: CircleEllipsis,
  setting: Settings,
  progress: Loader2,

  // Products & Items
  product: Package,
  device: Smartphone,
  electronics: Tv,
  accessory: Headphones,
  clothing: Shirt,
  furniture: LandPlot,

  // Misc
  reference: BookText,
  category: LayoutGrid,
  description: FileText,
  priority: AlertTriangle,
  resource: Boxes,

  // More True Network specific icons
  onchain: Network,
  attestation: BadgeCheck,
  algorithm: Code,
  data: Database,
  schema: LayoutGrid,
  compute: Server,
  network: Globe,
  issuer: Fingerprint,
  wasm: Boxes
}
/**
 * Improved function to detect keywords within a field name
 * Can find substrings like "file" in "filename" and uses a scoring system
 * for more accurate matching
 */
export const getIconForField = (fieldName: string): React.ComponentType<any> => {
  const normalizedName = fieldName.toLowerCase().replace(/[^a-z0-9]/g, '')

  // Get all matches with their scores
  const matches = findAllMatches(normalizedName)

  // Find the highest scoring match
  if (matches.length > 0) {
    // Sort by score (highest first)
    matches.sort((a, b) => b.score - a.score)
    const bestMatch = matches[0]
    return iconMap[bestMatch.type] || TrueSVG
  }

  return iconMap.user || TrueSVG // Default fallback
}

/**
 * Find all keyword matches for a given input string
 * Only matches full keywords (not partial) but can find them within larger strings
 * Returns array of matches with type, keyword, and score
 */
const findAllMatches = (input: string): KeywordMatch[] => {
  const matches: KeywordMatch[] = []

  // Check each pattern type
  for (const [type, keywords] of Object.entries(patterns)) {
    // Check each keyword in this pattern
    for (const keyword of keywords) {
      // Only look for full keywords within the input string
      if (input.includes(keyword)) {
        // Exact match gets higher score
        if (input === keyword) {
          matches.push({ type, keyword, score: 10 })
        } else {
          // Longer keywords get higher scores when matched
          // Calculate score based on keyword length and position in input
          const keywordRatio = keyword.length / input.length
          const positionFactor = 1 - (input.indexOf(keyword) / input.length) * 0.5
          const score = Math.min(8, 3 + (keyword.length / 3) * keywordRatio * positionFactor)
          matches.push({ type, keyword, score })
        }
      }
    }
  }

  return matches
}

/**
 * Get metadata about the icon matching for debugging and customization
 */
export const getIconMetadata = (fieldName: string) => {
  const normalizedName = fieldName.toLowerCase().replace(/[^a-z0-9]/g, '')
  const matches = findAllMatches(normalizedName)

  // Sort matches by score (highest first)
  matches.sort((a, b) => b.score - a.score)

  return {
    matches: matches.map(m => ({
      type: m.type,
      keyword: m.keyword,
      score: m.score
    })),
    primaryMatch: matches.length > 0 ? matches[0].type : 'user',
    hasMatch: matches.length > 0,
    allMatchTypes: matches.map(m => m.type)
  }
}