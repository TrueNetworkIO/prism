import {
  // Identity & Personal
  User, Fingerprint, BadgeCheck, AtSign, Mail, Phone, Home,
  // Education & Professional
  GraduationCap, Briefcase, Award, Medal,
  // Financial & Economic
  DollarSign, Landmark, LineChart, Receipt, ShieldCheck, Umbrella,
  // Reputation & Trust
  Star, ThumbsUp, CheckCircle2, ClipboardCheck,
  // Health & Medical
  Heart, Syringe, Stethoscope, Activity,
  // Gaming & Digital
  Gamepad2, Trophy, Package, KeyboardIcon,
  // Location & Travel
  Home as HomeIcon, Plane, Stamp,
  // Environmental & Impact
  Leaf, Sprout, Zap, Recycle,
  // Governance & Participation
  Vote, Users, UserCog, GitFork,
  // Security & Access
  Shield, Key, Lock, UserCheck,
  // Intellectual Property
  Copyright, FileKey, BookOpen, PenTool,
  // Community & Social Impact
  HeartHandshake, Lightbulb, UsersRound, HandHeart,
  // DeFi & Web3
  Wallet, Layers, LandPlot, Network,
  // Behavioral & Analytics
  BarChart2, MousePointer2, SlidersHorizontal, History,
  // Time & Date
  Clock, Calendar, Timer, Hourglass,
  // Content & Media
  Image, Video, Music, FileText,
  // Geographic & Location
  MapPin, Globe, Building2, Route,
  IdCard
} from 'lucide-react'

import TrueSVG from '../../public/file.svg'

interface IconMap {
  [key: string]: React.ComponentType<any> 
}

const patterns = {
  // Devices.
  keyboard: ['keyboard', 'input', 'key', 'press', 'character'],

  // Identity & Personal Info
  user: ['user', 'name', 'person', 'profile', 'account', 'identity', 'author', 'owner', 'holder'],
  biometric: ['fingerprint', 'retina', 'facial', 'biometric', 'dna', 'signature', 'cid'],
  credential: ['credential', 'license', 'permit', 'certificate', 'badge', 'qualification'],
  social: ['twitter', 'github', 'linkedin', 'discord', 'telegram', 'social'],
  email: ['email', 'mail', 'contact'],
  phone: ['phone', 'mobile', 'telephone', 'contact'],
  address: ['address', 'physical', 'street', 'postal'],

  // Education & Professional
  education: ['degree', 'diploma', 'education', 'graduate', 'university', 'school', 'college'],
  employment: ['job', 'work', 'employer', 'position', 'career', 'occupation', 'employment'],
  skill: ['skill', 'expertise', 'competency', 'proficiency', 'knowledge', 'capability'],
  certification: ['certification', 'accreditation', 'qualification', 'training'],

  // Financial & Economic
  income: ['income', 'salary', 'earnings', 'revenue', 'wage'],
  bank: ['bank', 'financial', 'institution', 'account'],
  investment: ['invest', 'portfolio', 'stock', 'share', 'fund'],
  creditScore: ['credit', 'fico', 'score', 'rating', 'creditworthiness'],
  asset: ['asset', 'property', 'ownership', 'holding', 'possession'],
  transaction: ['transaction', 'payment', 'transfer', 'exchange'],
  collateral: ['collateral', 'security', 'guarantee', 'backing'],
  insurance: ['insurance', 'coverage', 'policy', 'protection'],

  // Reputation & Trust
  reputation: ['reputation', 'standing', 'credibility', 'trust', 'reliability', 'xp'],
  review: ['review', 'rating', 'feedback', 'assessment', 'evaluation'],
  verification: ['verify', 'validate', 'confirm', 'authenticate', 'prove'],
  compliance: ['compliance', 'regulatory', 'legal', 'standard', 'requirement'],

  // Health & Medical
  health: ['health', 'medical', 'clinical', 'condition', 'diagnosis'],
  vaccination: ['vaccine', 'immunization', 'shot', 'booster'],
  test: ['test', 'screening', 'examination', 'assessment', 'result'],
  fitness: ['fitness', 'exercise', 'workout', 'activity', 'training'],

  // Gaming & Digital
  game: ['game', 'play', 'match', 'round', 'session'],
  gameStats: ['stats', 'statistics', 'performance', 'metrics', 'analytics'],
  achievement: ['achievement', 'accomplishment', 'milestone', 'trophy'],
  inventory: ['inventory', 'collection', 'items', 'assets', 'belongings'],

  // Location & Travel
  residence: ['residence', 'home', 'dwelling', 'address', 'domicile'],
  citizenship: ['citizen', 'nationality', 'residency', 'passport'],
  travel: ['travel', 'journey', 'trip', 'visit', 'destination'],
  visa: ['visa', 'permit', 'authorization', 'entry'],

  // Environmental & Impact
  carbon: ['carbon', 'emission', 'footprint', 'environmental', 'climate'],
  sustainability: ['sustainable', 'green', 'eco', 'environmental', 'renewable'],
  energy: ['energy', 'power', 'consumption', 'usage', 'utility'],
  recycling: ['recycle', 'waste', 'disposal', 'reuse'],

  // Governance & Participation
  vote: ['vote', 'ballot', 'election', 'poll', 'decision'],
  membership: ['member', 'subscription', 'affiliation', 'belonging'],
  role: ['role', 'position', 'responsibility', 'duty', 'function'],
  delegation: ['delegate', 'represent', 'proxy', 'authority'],

  // Security & Access
  clearance: ['clearance', 'access', 'permission', 'authorization'],
  authentication: ['auth', 'authenticate', 'verify', 'validate'],
  permission: ['permission', 'right', 'privilege', 'allowance'],
  kyc: ['kyc', 'know', 'customer', 'identity', 'verification'],

  // Intellectual Property
  copyright: ['copyright', 'intellectual', 'property', 'rights'],
  license: ['license', 'patent', 'trademark', 'agreement'],
  ownership: ['owner', 'rights', 'title', 'deed', 'possession'],
  creation: ['create', 'author', 'artist', 'maker', 'producer'],

  // Community & Social Impact
  contribution: ['contribute', 'donation', 'support', 'help'],
  impact: ['impact', 'influence', 'effect', 'change', 'result'],
  participation: ['participate', 'involve', 'engage', 'join'],
  volunteer: ['volunteer', 'service', 'help', 'assist'],

  // DeFi & Web3
  wallet: ['wallet', 'address', 'account', 'holder'],
  stake: ['stake', 'deposit', 'lock', 'commit'],
  governance: ['governance', 'dao', 'proposal', 'vote'],
  protocol: ['protocol', 'platform', 'system', 'network'],

  // Behavioral & Analytics
  behavior: ['behavior', 'pattern', 'habit', 'activity'],
  interaction: ['interact', 'engage', 'participate', 'use'],
  preference: ['prefer', 'choice', 'option', 'selection'],
  history: ['history', 'record', 'log', 'track'],

  // Time & Date
  time: ['time', 'duration', 'period', 'timestamp', 'date', 'when'],
  calendar: ['schedule', 'calendar', 'date', 'appointment'],
  age: ['age', 'years', 'birthday', 'dob'],
  deadline: ['deadline', 'due', 'expiry', 'expiration', 'until'],

  // Content & Media
  image: ['image', 'photo', 'picture', 'avatar', 'thumbnail'],
  video: ['video', 'movie', 'film', 'clip', 'stream'],
  audio: ['audio', 'sound', 'music', 'voice', 'recording'],
  document: ['document', 'file', 'paper', 'record', 'certificate'],

  // Geographic & Location
  location: ['location', 'position', 'coordinate', 'place', 'spot', 'site'],
  country: ['country', 'nation', 'region', 'territory'],
  city: ['city', 'town', 'municipality', 'district'],
  route: ['route', 'path', 'direction', 'way', 'track']
}

const iconMap: IconMap = {
  true: TrueSVG,
  keyboard: KeyboardIcon,

  // Identity & Personal
  user: User,
  biometric: Fingerprint,
  credential: BadgeCheck,
  social: AtSign,
  email: Mail,
  phone: Phone,
  address: Home,

  // Education & Professional
  education: GraduationCap,
  employment: Briefcase,
  skill: Award,
  certification: Medal,

  // Financial & Economic
  income: DollarSign,
  bank: Landmark,
  investment: LineChart,
  creditScore: Star,
  asset: Package,
  transaction: Receipt,
  collateral: ShieldCheck,
  insurance: Umbrella,

  // Reputation & Trust
  reputation: Star,
  review: ThumbsUp,
  verification: CheckCircle2,
  compliance: ClipboardCheck,

  // Health & Medical
  health: Heart,
  vaccination: Syringe,
  test: Stethoscope,
  fitness: Activity,

  // Gaming & Digital
  game: Gamepad2,
  gameStats: BarChart2,
  achievement: Trophy,
  inventory: Package,

  // Location & Travel
  residence: HomeIcon,
  citizenship: IdCard,
  travel: Plane,
  visa: Stamp,

  // Environmental & Impact
  carbon: Leaf,
  sustainability: Sprout,
  energy: Zap,
  recycling: Recycle,

  // Governance & Participation
  vote: Vote,
  membership: Users,
  role: UserCog,
  delegation: GitFork,

  // Security & Access
  clearance: Shield,
  authentication: Key,
  permission: Lock,
  kyc: UserCheck,

  // Intellectual Property
  copyright: Copyright,
  license: FileKey,
  ownership: BookOpen,
  creation: PenTool,

  // Community & Social Impact
  contribution: HeartHandshake,
  impact: Lightbulb,
  participation: UsersRound,
  volunteer: HandHeart,

  // DeFi & Web3
  wallet: Wallet,
  stake: Layers,
  governance: LandPlot,
  protocol: Network,

  // Behavioral & Analytics
  behavior: BarChart2,
  interaction: MousePointer2,
  preference: SlidersHorizontal,
  history: History,

  // Time & Date
  time: Clock,
  calendar: Calendar,
  age: Timer,
  deadline: Hourglass,

  // Content & Media
  image: Image,
  video: Video,
  audio: Music,
  document: FileText,

  // Geographic & Location
  location: MapPin,
  country: Globe,
  city: Building2,
  route: Route
}

export const getIconForField = (fieldName: string): React.ComponentType<any> => {
  const normalizedName = fieldName.toLowerCase().replace(/[^a-z0-9]/g, '')
  
  // Find matching pattern
  let iconType = 'user' // Default icon type
  for (const [type, keywords] of Object.entries(patterns)) {
    if (keywords.some(keyword => normalizedName.includes(keyword))) {
      iconType = type
      break
    }
  }

  return iconMap[iconType] || TrueSVG // Fallback to User icon if no match found
}

export const getIconMetadata = (fieldName: string) => {
  const normalizedName = fieldName.toLowerCase().replace(/[^a-z0-9]/g, '')
  
  // Find all matching categories
  const matches = Object.entries(patterns)
    .filter(([_, keywords]) => 
      keywords.some(keyword => normalizedName.includes(keyword))
    )
    .map(([type]) => type)

  return {
    matches,
    primaryMatch: matches[matches.length-1] || 'user',
    hasMatch: matches.length > 0
  }
}