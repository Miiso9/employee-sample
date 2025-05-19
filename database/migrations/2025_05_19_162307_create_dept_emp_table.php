<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dept_emp', function (Blueprint $table) {
            $table->integer('emp_no');
            $table->char('dept_no', 4);
            $table->date('from_date');
            $table->date('to_date');

            $table->primary(['emp_no', 'dept_no']);

            $table->foreign('emp_no')
                ->references('emp_no')
                ->on('employees')
                ->onDelete('cascade');

            $table->foreign('dept_no')
                ->references('dept_no')
                ->on('departments')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dept_emp');
    }
};
