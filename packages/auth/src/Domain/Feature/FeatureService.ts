import { FeatureDescription, GetFeatures } from '@standardnotes/features'
import { TimerInterface } from '@standardnotes/time'

import { RoleToSubscriptionMapInterface } from '../Role/RoleToSubscriptionMapInterface'
import { User } from '../User/User'
import { FeatureServiceInterface } from './FeatureServiceInterface'
import { OfflineUserSubscriptionRepositoryInterface } from '../Subscription/OfflineUserSubscriptionRepositoryInterface'
import { UserSubscriptionRepositoryInterface } from '../Subscription/UserSubscriptionRepositoryInterface'

export class FeatureService implements FeatureServiceInterface {
  constructor(
    private roleToSubscriptionMap: RoleToSubscriptionMapInterface,
    private offlineUserSubscriptionRepository: OfflineUserSubscriptionRepositoryInterface,
    private timer: TimerInterface,
    private userSubscriptionRepository: UserSubscriptionRepositoryInterface,
  ) {}

  async userIsEntitledToFeature(user: User, featureIdentifier: string): Promise<boolean> {
    void user
    void featureIdentifier
    void this.offlineUserSubscriptionRepository
    void this.timer
    void this.userSubscriptionRepository
    void this.roleToSubscriptionMap
    return true
  }

  async getFeaturesForOfflineUser(email: string): Promise<{ features: FeatureDescription[]; roles: string[] }> {
    void email
    return {
      features: GetFeatures(),
      roles: ['PRO_USER'],
    }
  }

  async getFeaturesForUser(user: User): Promise<Array<FeatureDescription>> {
    void user
    return GetFeatures()
  }
}
