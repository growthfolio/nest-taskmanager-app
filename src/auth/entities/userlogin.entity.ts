import { ApiProperty } from "@nestjs/swagger"

export class UserLogin {

    @ApiProperty() 
    public email: string

    @ApiProperty()
    public password: string

}