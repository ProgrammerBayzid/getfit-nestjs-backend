import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';



export class DoctorBankAccount {

  @ApiProperty({
    example: 'The City Bank Limited',
    description: 'The Bank name',
  })
  @Prop({ default: null })
  name: string;

  @ApiProperty({
    example: 'Gazipur SME',
    description: 'The Bank Branch name',
  })
  @Prop({ default: null })
  branchName: string;

  @ApiProperty({
    example: '020270607',
    description: 'The Bank Routing Name name',
  })
  @Prop({ default: null })
  routingName: string;


  @ApiProperty({
    example: 'Rony Hosen',
    description: 'The Bank Accounts Holder Name ',
  })
  @Prop({ default: null })
  accountsHolderName: string;


  @ApiProperty({
    example: '2302526230001',
    description: 'The Bank Account Number',
  })
  @Prop({ default: null })
  accountNumber: string;



  @ApiProperty({
    example: '+88017566748675',
    description: 'The Bank Accounts Holder Mobile Number',
  })
  @Prop({ default: null })
  mobileNumber: string;


}


export const createDefaultDoctorBankAccount = (): DoctorBankAccount => ({
  name: null,

  branchName: null,

  routingName: null,

  accountsHolderName: null,

  accountNumber: null,

  mobileNumber: null,
});
